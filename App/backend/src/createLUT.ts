import { AddressLookupTableProgram, Keypair, PublicKey, VersionedTransaction, TransactionMessage, TransactionInstruction, SystemProgram, LAMPORTS_PER_SOL, Blockhash, AddressLookupTableAccount, SYSVAR_RENT_PUBKEY } from '@solana/web3.js';
import fs from 'fs';
import path from 'path';
import { wallet, connection, PUMP_PROGRAM, payer } from '../config';
import promptSync from 'prompt-sync';
import { searcherClient } from "./clients/jito";
import { Bundle as JitoBundle } from 'jito-ts/dist/sdk/block-engine/types.js';
import { getRandomTipAccount } from "./clients/config";
import { lookupTableProvider } from "./clients/LookupTableProvider";
import { loadKeypairs } from './createKeys';
import * as spl from '@solana/spl-token';
import idl from "../pumpfun-IDL.json";
import { Program, Idl, AnchorProvider, setProvider } from "@coral-xyz/anchor";
import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes';

const prompt = promptSync();
const keyInfoPath = path.join(__dirname, 'keyInfo.json');

const provider = new AnchorProvider(connection, wallet as any, {});

setProvider(provider);

const program = new Program(idl as Idl, PUMP_PROGRAM);

export async function extendLUT() {
    // -------- step 1: ask nessesary questions for LUT build --------
    let vanityPK = null;

    const vanityPrompt = prompt('Do you want to import a custom vanity address? (y/n): ').toLowerCase();
    const jitoTipAmt = +prompt('Jito tip in Sol (Ex. 0.01): ') * LAMPORTS_PER_SOL;
    if (vanityPrompt === 'y') {
        vanityPK = prompt('Enter the private key of the vanity address (bs58): ');
    }

    // Read existing data from poolInfo.json
    let poolInfo: { [key: string]: any } = {};
    if (fs.existsSync(keyInfoPath)) {
        const data = fs.readFileSync(keyInfoPath, 'utf-8');
        poolInfo = JSON.parse(data);
    }

    const bundledTxns1: VersionedTransaction[] = [];
    


    // -------- step 2: get all LUT addresses --------
    const accounts: PublicKey[] = []; // Array with all new keys to push to the new LUT
    const lut = new PublicKey(poolInfo.addressLUT.toString());

    const lookupTableAccount = (
        await connection.getAddressLookupTable(lut)
    ).value;

    if (lookupTableAccount == null) {
        console.log("Lookup table account not found!");
        process.exit(0);
    }

    // Write mint info to json
    let mintKp;

    if (vanityPK === null) {
        mintKp = Keypair.generate();
    } else {
        mintKp = Keypair.fromSecretKey(bs58.decode(vanityPK));
    }

    console.log(`Mint: ${mintKp.publicKey.toString()}`);
    poolInfo.mint = mintKp.publicKey.toString();
    poolInfo.mintPk = bs58.encode(mintKp.secretKey);
    fs.writeFileSync(keyInfoPath, JSON.stringify(poolInfo, null, 2));  

    // Fetch accounts for LUT
    const mintAuthority = new PublicKey(
        "TSLvdd1pWpHVjahSpsvCXUbgwsL3JAcvokwaKt1eokM",
    );
    const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey(
        "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s",
    );
    const global = new PublicKey("4wTV1YmiEkRvAtNtsSGPtUrqRYQMe5SKy2uB4Jjaxnjf");
    const [bondingCurve] = PublicKey.findProgramAddressSync(
        [Buffer.from("bonding-curve"), mintKp.publicKey.toBytes()],
        program.programId,
    );
    const [metadata] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          MPL_TOKEN_METADATA_PROGRAM_ID.toBytes(),
          mintKp.publicKey.toBytes(),
        ],
        MPL_TOKEN_METADATA_PROGRAM_ID,
    );
      let [associatedBondingCurve] = PublicKey.findProgramAddressSync(
        [
          bondingCurve.toBytes(),
          spl.TOKEN_PROGRAM_ID.toBytes(),
          mintKp.publicKey.toBytes(),
        ],
        spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      );
      const eventAuthority = new PublicKey(
        "Ce6TQqeHC9p8KetsN6JsjHK7UTZk7nasjjnr7XxXp9F1",
      );
      const feeRecipient = new PublicKey(
        "CebN5WGQ4jvEPvsVU4EoHEpgzq1VV7AbicfhtW4xC9iM",
      );


    // These values vary based on the new market created
    accounts.push(
        spl.ASSOCIATED_TOKEN_PROGRAM_ID,
        spl.TOKEN_PROGRAM_ID,
        MPL_TOKEN_METADATA_PROGRAM_ID,
        mintAuthority,
        global,
        program.programId,
        PUMP_PROGRAM,
        metadata,
        associatedBondingCurve,
        bondingCurve,
        eventAuthority,
        SystemProgram.programId,
        SYSVAR_RENT_PUBKEY,
        mintKp.publicKey,
        feeRecipient,
    );   // DO NOT ADD PROGRAM OR JITO TIP ACCOUNT??

    // Loop through each keypair and push its pubkey and ATAs to the accounts array
    const keypairs = loadKeypairs();
    for (const keypair of keypairs) {
        const ataToken = await spl.getAssociatedTokenAddress(
            mintKp.publicKey,
            keypair.publicKey,
        );
        accounts.push(keypair.publicKey, ataToken);
    }

    // Push wallet and payer ATAs and pubkey JUST IN CASE (not sure tbh)
    const ataTokenwall = await spl.getAssociatedTokenAddress(
        mintKp.publicKey,
        wallet.publicKey,
    );

    const ataTokenpayer = await spl.getAssociatedTokenAddress(
        mintKp.publicKey,
        payer.publicKey,
    );

    // Add just in case
    accounts.push(
        wallet.publicKey,
        payer.publicKey,
        ataTokenwall,
        ataTokenpayer,
        lut, 
        spl.NATIVE_MINT, 
    );



    
    // -------- step 5: push LUT addresses to a txn --------
    const extendLUTixs1: TransactionInstruction[] = [];
    const extendLUTixs2: TransactionInstruction[] = [];
    const extendLUTixs3: TransactionInstruction[] = [];
    const extendLUTixs4: TransactionInstruction[] = [];

    // Chunk accounts array into groups of 30
    const accountChunks = Array.from({ length: Math.ceil(accounts.length / 30) }, (v, i) => accounts.slice(i * 30, (i + 1) * 30));
    console.log("Num of chunks:", accountChunks.length);
    console.log("Num of accounts:", accounts.length);

    for (let i = 0; i < accountChunks.length; i++) {
        const chunk = accountChunks[i];
        const extendInstruction = AddressLookupTableProgram.extendLookupTable({
            lookupTable: lut,
            authority: payer.publicKey,
            payer: payer.publicKey,
            addresses: chunk,
        });
        if (i == 0) {
            extendLUTixs1.push(extendInstruction);
            console.log("Chunk:", i);
        } else if (i == 1) {
            extendLUTixs2.push(extendInstruction);
            console.log("Chunk:", i);
        } else if (i == 2) {
            extendLUTixs3.push(extendInstruction);
            console.log("Chunk:", i);
        } else if (i == 3) {
            extendLUTixs4.push(extendInstruction);
            console.log("Chunk:", i);
        }
    }
    
    // Add the jito tip to the last txn
    extendLUTixs4.push(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: getRandomTipAccount(),
            lamports: BigInt(jitoTipAmt),
        })
    );




    // -------- step 6: seperate into 2 different bundles to complete all txns --------
    const { blockhash: block1 } = await connection.getLatestBlockhash();

    const extend1 = await buildTxn(extendLUTixs1, block1, lookupTableAccount);
    const extend2 = await buildTxn(extendLUTixs2, block1, lookupTableAccount);
    const extend3 = await buildTxn(extendLUTixs3, block1, lookupTableAccount);
    const extend4 = await buildTxn(extendLUTixs4, block1, lookupTableAccount);

    bundledTxns1.push(
        extend1,
        extend2,
        extend3,
        extend4,
    );
    


    // -------- step 7: send bundle --------
    await sendBundle(bundledTxns1);
    
}




export async function createLUT() {

    // -------- step 1: ask nessesary questions for LUT build --------
    const jitoTipAmt = +prompt('Jito tip in Sol (Ex. 0.01): ') * LAMPORTS_PER_SOL;

    // Read existing data from poolInfo.json
    let poolInfo: { [key: string]: any } = {};
    if (fs.existsSync(keyInfoPath)) {
        const data = fs.readFileSync(keyInfoPath, 'utf-8');
        poolInfo = JSON.parse(data);
    }

    const bundledTxns: VersionedTransaction[] = [];



    // -------- step 2: create a new LUT every time there is a new launch --------
    const createLUTixs: TransactionInstruction[] = [];

    const [ create, lut ] = AddressLookupTableProgram.createLookupTable({
        authority: payer.publicKey,
        payer: payer.publicKey,
        recentSlot: await connection.getSlot("finalized")
    });

    createLUTixs.push(
        create,
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: getRandomTipAccount(),
            lamports: jitoTipAmt,
        }),
    );

    const addressesMain: PublicKey[] = [];
    createLUTixs.forEach((ixn) => {
        ixn.keys.forEach((key) => {
            addressesMain.push(key.pubkey);
        });
    });

    const lookupTablesMain1 =
        lookupTableProvider.computeIdealLookupTablesForAddresses(addressesMain);

    const { blockhash } = await connection.getLatestBlockhash();

    const messageMain1 = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: blockhash,
        instructions: createLUTixs,
    }).compileToV0Message(lookupTablesMain1);
    const createLUT = new VersionedTransaction(messageMain1);

    // Append new LUT info
    poolInfo.addressLUT = lut.toString(); // Using 'addressLUT' as the field name

    try {
        const serializedMsg = createLUT.serialize();
        console.log('Txn size:', serializedMsg.length);
        if (serializedMsg.length > 1232) {
            console.log('tx too big');
        }
        createLUT.sign([payer]);
    } catch (e) {
        console.log(e, 'error signing createLUT');
        process.exit(0);
    }

    // Write updated content back to poolInfo.json
    fs.writeFileSync(keyInfoPath, JSON.stringify(poolInfo, null, 2));

    // Push to bundle
    bundledTxns.push(createLUT);


    // -------- step 3: SEND BUNDLE --------
    await sendBundle(bundledTxns);
}


async function buildTxn(extendLUTixs: TransactionInstruction[], blockhash: string | Blockhash, lut: AddressLookupTableAccount): Promise<VersionedTransaction> {
    const messageMain = new TransactionMessage({
            payerKey: payer.publicKey,
            recentBlockhash: blockhash,
            instructions: extendLUTixs,
        }).compileToV0Message([lut]);
        const txn = new VersionedTransaction(messageMain);
    
        try {
            const serializedMsg = txn.serialize();
            console.log('Txn size:', serializedMsg.length);
            if (serializedMsg.length > 1232) {
                console.log('tx too big');
            }
            txn.sign([payer]);
        } catch (e) {
            const serializedMsg = txn.serialize();
            console.log('txn size:', serializedMsg.length);
            console.log(e, 'error signing extendLUT');
            process.exit(0);
        }
        return txn;
}



async function sendBundle(bundledTxns: VersionedTransaction[]) {
    try {
        const bundleId = await searcherClient.sendBundle(new JitoBundle(bundledTxns, bundledTxns.length));
        console.log(`Bundle ${bundleId} sent.`);
    } catch (error) {
        const err = error as any;
        console.error("Error sending bundle:", err.message);
    
        if (err?.message?.includes('Bundle Dropped, no connected leader up soon')) {
            console.error("Error sending bundle: Bundle Dropped, no connected leader up soon.");
        } else {
            console.error("An unexpected error occurred:", err.message);
        }
    }
}


/*
async function createAndSignVersionedTxNOLUT(
    instructionsChunk: TransactionInstruction[], 
    blockhash: Blockhash | string,
): Promise<VersionedTransaction> {
    const addressesMain: PublicKey[] = [];
    instructionsChunk.forEach((ixn) => {
        ixn.keys.forEach((key) => {
            addressesMain.push(key.pubkey);
        });
    });

    const lookupTablesMain1 =
        lookupTableProvider.computeIdealLookupTablesForAddresses(addressesMain);

    const message = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: blockhash,
        instructions: instructionsChunk,
    }).compileToV0Message(lookupTablesMain1);

    const versionedTx = new VersionedTransaction(message);
    const serializedMsg = versionedTx.serialize();

    console.log("Txn size:", serializedMsg.length);
    if (serializedMsg.length > 1232) { console.log('tx too big'); }
    versionedTx.sign([wallet]);

    
    // Simulate each txn
    const simulationResult = await connection.simulateTransaction(versionedTx, { commitment: "processed" });

    if (simulationResult.value.err) {
    console.log("Simulation error:", simulationResult.value.err);
    } else {
    console.log("Simulation success. Logs:");
    simulationResult.value.logs?.forEach(log => console.log(log));
    }
    

    return versionedTx;
}
*/
