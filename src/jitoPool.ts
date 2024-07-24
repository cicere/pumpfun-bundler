import { connection, wallet, PUMP_PROGRAM, feeRecipient, eventAuthority, global, MPL_TOKEN_METADATA_PROGRAM_ID, mintAuthority, rpc, payer } from "../config";
import {
	PublicKey,
	VersionedTransaction,
	TransactionInstruction,
	SYSVAR_RENT_PUBKEY,
	TransactionMessage,
	SystemProgram,
	Keypair,
	LAMPORTS_PER_SOL,
	AddressLookupTableAccount,
} from "@solana/web3.js";
import { loadKeypairs } from "./createKeys";
import { searcherClient } from "./clients/jito";
import { Bundle as JitoBundle } from "jito-ts/dist/sdk/block-engine/types.js";
import promptSync from "prompt-sync";
import * as spl from "@solana/spl-token";
import bs58 from "bs58";
import path from "path";
import fs from "fs";
import { Program } from "@coral-xyz/anchor";
import { getRandomTipAccount } from "./clients/config";
import BN from "bn.js";
import axios from "axios";
import * as anchor from "@coral-xyz/anchor";

const prompt = promptSync();
const keyInfoPath = path.join(__dirname, "keyInfo.json");

export async function buyBundle() {
	const provider = new anchor.AnchorProvider(new anchor.web3.Connection(rpc), new anchor.Wallet(wallet), { commitment: "confirmed" });

	// Initialize pumpfun anchor
	const IDL_PumpFun = JSON.parse(fs.readFileSync("./pumpfun-IDL.json", "utf-8")) as anchor.Idl;

	const program = new anchor.Program(IDL_PumpFun, PUMP_PROGRAM, provider);

	// Start create bundle
	const bundledTxns: VersionedTransaction[] = [];
	const keypairs: Keypair[] = loadKeypairs();

	let keyInfo: { [key: string]: any } = {};
	if (fs.existsSync(keyInfoPath)) {
		const existingData = fs.readFileSync(keyInfoPath, "utf-8");
		keyInfo = JSON.parse(existingData);
	}

	const lut = new PublicKey(keyInfo.addressLUT.toString());

	const lookupTableAccount = (await connection.getAddressLookupTable(lut)).value;

	if (lookupTableAccount == null) {
		console.log("Lookup table account not found!");
		process.exit(0);
	}

	// -------- step 1: ask nessesary questions for pool build --------
	const name = prompt("Name of your token: ");
	const symbol = prompt("Symbol of your token: ");
	const description = prompt("Description of your token: ");
	const twitter = prompt("Twitter of your token: ");
	const telegram = prompt("Telegram of your token: ");
	const website = prompt("Website of your token: ");
	const tipAmt = +prompt("Jito tip in SOL: ") * LAMPORTS_PER_SOL;

	// -------- step 2: build pool init + dev snipe --------
	const files = await fs.promises.readdir("./img");
	if (files.length == 0) {
		console.log("No image found in the img folder");
		return;
	}
	if (files.length > 1) {
		console.log("Multiple images found in the img folder, please only keep one image");
		return;
	}
	const data: Buffer = fs.readFileSync(`./img/${files[0]}`);

	let formData = new FormData();
	if (data) {
		formData.append("file", new Blob([data], { type: "image/jpeg" }));
	} else {
		console.log("No image found");
		return;
	}

	formData.append("name", name);
	formData.append("symbol", symbol);
	formData.append("description", description);
	formData.append("twitter", twitter);
	formData.append("telegram", telegram);
	formData.append("website", website);
	formData.append("showName", "true");

	let metadata_uri;
	try {
		const response = await axios.post("https://pump.fun/api/ipfs", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
		metadata_uri = response.data.metadataUri;
		console.log("Metadata URI: ", metadata_uri);
	} catch (error) {
		console.error("Error uploading metadata:", error);
	}

	const mintKp = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(keyInfo.mintPk)));
	console.log(`Mint: ${mintKp.publicKey.toBase58()}`);

	const [bondingCurve] = PublicKey.findProgramAddressSync([Buffer.from("bonding-curve"), mintKp.publicKey.toBytes()], program.programId);
	const [metadata] = PublicKey.findProgramAddressSync(
		[Buffer.from("metadata"), MPL_TOKEN_METADATA_PROGRAM_ID.toBytes(), mintKp.publicKey.toBytes()],
		MPL_TOKEN_METADATA_PROGRAM_ID
	);

	const account1 = mintKp.publicKey;
	const account2 = mintAuthority;
	const account3 = bondingCurve;
	const account5 = global;
	const account6 = MPL_TOKEN_METADATA_PROGRAM_ID;
	const account7 = metadata;

	const createIx = await program.methods
		.create(name, symbol, metadata_uri)
		.accounts({
			mint: account1,
			mintAuthority: account2,
			bondingCurve: account3,
			global: account5,
			mplTokenMetadata: account6,
			metadata: account7,
			user: wallet.publicKey,
			systemProgram: SystemProgram.programId,
			tokenProgram: spl.TOKEN_PROGRAM_ID,
			associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
			rent: SYSVAR_RENT_PUBKEY,
			eventAuthority,
			program: PUMP_PROGRAM,
		})
		.instruction();

	// Get the associated token address
	const ata = spl.getAssociatedTokenAddressSync(mintKp.publicKey, wallet.publicKey);
	const ataIx = spl.createAssociatedTokenAccountIdempotentInstruction(wallet.publicKey, ata, wallet.publicKey, mintKp.publicKey);

	// Extract tokenAmount from keyInfo for this keypair
	const keypairInfo = keyInfo[wallet.publicKey.toString()];
	if (!keypairInfo) {
		console.log(`No key info found for keypair: ${wallet.publicKey.toString()}`);
	}

	// Calculate SOL amount based on tokenAmount
	const amount = new BN(keypairInfo.tokenAmount);
	const solAmount = new BN(100000 * keypairInfo.solAmount * LAMPORTS_PER_SOL);

	const buyIx = await program.methods
		.buy(amount, solAmount)
		.accounts({
			global,
			feeRecipient,
			mint: mintKp.publicKey,
			bondingCurve,
			associatedUser: ata,
			user: wallet.publicKey,
			systemProgram: SystemProgram.programId,
			tokenProgram: spl.TOKEN_PROGRAM_ID,
			rent: SYSVAR_RENT_PUBKEY,
			eventAuthority,
			program: PUMP_PROGRAM,
		})
		.instruction();

	const tipIxn = SystemProgram.transfer({
		fromPubkey: wallet.publicKey,
		toPubkey: getRandomTipAccount(),
		lamports: BigInt(tipAmt),
	});

	const initIxs: TransactionInstruction[] = [createIx, ataIx, buyIx, tipIxn];

	const { blockhash } = await connection.getLatestBlockhash();

	const messageV0 = new TransactionMessage({
		payerKey: wallet.publicKey,
		instructions: initIxs,
		recentBlockhash: blockhash,
	}).compileToV0Message();

	const fullTX = new VersionedTransaction(messageV0);
	fullTX.sign([wallet, mintKp]);

	bundledTxns.push(fullTX);

	// -------- step 3: create swap txns --------
	const txMainSwaps: VersionedTransaction[] = await createWalletSwaps(blockhash, keypairs, lookupTableAccount, bondingCurve, mintKp.publicKey, program);
	bundledTxns.push(...txMainSwaps);

	// -------- step 4: send bundle --------
	/*
        // Simulate each transaction
        for (const tx of bundledTxns) {
            try {
                const simulationResult = await connection.simulateTransaction(tx, { commitment: "processed" });
                console.log(simulationResult);

                if (simulationResult.value.err) {
                    console.error("Simulation error for transaction:", simulationResult.value.err);
                } else {
                    console.log("Simulation success for transaction. Logs:");
                    simulationResult.value.logs?.forEach(log => console.log(log));
                }
            } catch (error) {
                console.error("Error during simulation:", error);
            }
        }
        */

	await sendBundle(bundledTxns);
}

async function createWalletSwaps(
	blockhash: string,
	keypairs: Keypair[],
	lut: AddressLookupTableAccount,
	bondingCurve: PublicKey,
	associatedBondingCurve: PublicKey,
	mint: PublicKey,
	program: Program
): Promise<VersionedTransaction[]> {
	const txsSigned: VersionedTransaction[] = [];
	const chunkedKeypairs = chunkArray(keypairs, 6);

	// Load keyInfo data from JSON file
	let keyInfo: { [key: string]: { solAmount: number; tokenAmount: string; percentSupply: number } } = {};
	if (fs.existsSync(keyInfoPath)) {
		const existingData = fs.readFileSync(keyInfoPath, "utf-8");
		keyInfo = JSON.parse(existingData);
	}

	// Iterate over each chunk of keypairs
	for (let chunkIndex = 0; chunkIndex < chunkedKeypairs.length; chunkIndex++) {
		const chunk = chunkedKeypairs[chunkIndex];
		const instructionsForChunk: TransactionInstruction[] = [];

		// Iterate over each keypair in the chunk to create swap instructions
		for (let i = 0; i < chunk.length; i++) {
			const keypair = chunk[i];
			console.log(`Processing keypair ${i + 1}/${chunk.length}:`, keypair.publicKey.toString());

			const ataAddress = await spl.getAssociatedTokenAddress(mint, keypair.publicKey);

			const createTokenAta = spl.createAssociatedTokenAccountIdempotentInstruction(payer.publicKey, ataAddress, keypair.publicKey, mint);

			// Extract tokenAmount from keyInfo for this keypair
			const keypairInfo = keyInfo[keypair.publicKey.toString()];
			if (!keypairInfo) {
				console.log(`No key info found for keypair: ${keypair.publicKey.toString()}`);
				continue;
			}

			// Calculate SOL amount based on tokenAmount
			const amount = new BN(keypairInfo.tokenAmount);
			const solAmount = new BN(100000 * keypairInfo.solAmount * LAMPORTS_PER_SOL);

			const buyIx = await program.methods
				.buy(amount, solAmount)
				.accounts({
					global,
					feeRecipient,
					mint,
					bondingCurve,
					associatedBondingCurve,
					user: keypair.publicKey,
					systemProgram: SystemProgram.programId,
					tokenProgram: spl.TOKEN_PROGRAM_ID,
					rent: SYSVAR_RENT_PUBKEY,
					eventAuthority,
					program: PUMP_PROGRAM,
				})
				.instruction();

			instructionsForChunk.push(createTokenAta, buyIx);
		}

		// ALWAYS SIGN WITH THE FIRST WALLET
		const keypair = chunk[0];

		const message = new TransactionMessage({
			payerKey: keypair.publicKey,
			recentBlockhash: blockhash,
			instructions: instructionsForChunk,
		}).compileToV0Message([lut]);

		const versionedTx = new VersionedTransaction(message);

		const serializedMsg = versionedTx.serialize();
		console.log("Txn size:", serializedMsg.length);
		if (serializedMsg.length > 1232) {
			console.log("tx too big");
		}

		console.log(
			"Signing transaction with chunk signers",
			chunk.map((kp) => kp.publicKey.toString())
		);

		// Sign with the wallet for tip on the last instruction
		for (const kp of chunk) {
			if (kp.publicKey.toString() in keyInfo) {
				versionedTx.sign([kp]);
			}
		}

		versionedTx.sign([payer]);

		txsSigned.push(versionedTx);
	}

	return txsSigned;
}

function chunkArray<T>(array: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(array.length / size) }, (v, i) => array.slice(i * size, i * size + size));
}

export async function sendBundle(bundledTxns: VersionedTransaction[]) {
	/*
    // Simulate each transaction
    for (const tx of bundledTxns) {
        try {
            const simulationResult = await connection.simulateTransaction(tx, { commitment: "processed" });

            if (simulationResult.value.err) {
                console.error("Simulation error for transaction:", simulationResult.value.err);
            } else {
                console.log("Simulation success for transaction. Logs:");
                simulationResult.value.logs?.forEach(log => console.log(log));
            }
        } catch (error) {
            console.error("Error during simulation:", error);
        }
    }
    //*/

	try {
		const bundleId = await searcherClient.sendBundle(new JitoBundle(bundledTxns, bundledTxns.length));
		console.log(`Bundle ${bundleId} sent.`);

		///*
		// Assuming onBundleResult returns a Promise<BundleResult>
		const result = await new Promise((resolve, reject) => {
			searcherClient.onBundleResult(
				(result) => {
					console.log("Received bundle result:", result);
					resolve(result); // Resolve the promise with the result
				},
				(e: Error) => {
					console.error("Error receiving bundle result:", e);
					reject(e); // Reject the promise if there's an error
				}
			);
		});

		console.log("Result:", result);
		//*/
	} catch (error) {
		const err = error as any;
		console.error("Error sending bundle:", err.message);

		if (err?.message?.includes("Bundle Dropped, no connected leader up soon")) {
			console.error("Error sending bundle: Bundle Dropped, no connected leader up soon.");
		} else {
			console.error("An unexpected error occurred:", err.message);
		}
	}
}
