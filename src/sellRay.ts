import { connection, rpc, wallet, payer, RayLiqPoolv4 } from "../config";
import { PublicKey, VersionedTransaction, SYSVAR_RENT_PUBKEY, TransactionMessage, SystemProgram, Keypair, LAMPORTS_PER_SOL, TransactionInstruction } from "@solana/web3.js";
import { loadKeypairs } from "./createKeys";
import { searcherClient } from "./clients/jito";
import { Bundle as JitoBundle } from "jito-ts/dist/sdk/block-engine/types.js";
import promptSync from "prompt-sync";
import * as spl from "@solana/spl-token";
import bs58 from "bs58";
import path from "path";
import fs from "fs";
import * as anchor from "@coral-xyz/anchor";
import { randomInt } from "crypto";
import { getRandomTipAccount } from "./clients/config";
import BN from "bn.js";
import { derivePoolKeys, IPoolKeys } from "./clients/poolKeysReassigned";

const prompt = promptSync();
const keyInfoPath = path.join(__dirname, "keyInfo.json");

function chunkArray<T>(array: T[], size: number): T[][] {
	return Array.from({ length: Math.ceil(array.length / size) }, (v, i) => array.slice(i * size, i * size + size));
}

async function sendBundle(bundledTxns: VersionedTransaction[]) {
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
    */

	try {
		const bundleId = await searcherClient.sendBundle(new JitoBundle(bundledTxns, bundledTxns.length));
		console.log(`Bundle ${bundleId} sent.`);

		/*
        // Assuming onBundleResult returns a Promise<BundleResult>
        const result = await new Promise((resolve, reject) => {
            searcherClient.onBundleResult(
            (result) => {
                console.log('Received bundle result:', result);
                resolve(result); // Resolve the promise with the result
            },
            (e: Error) => {
                console.error('Error receiving bundle result:', e);
                reject(e); // Reject the promise if there's an error
            }
            );
        });
    
        console.log('Result:', result);
        */
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

export async function sellXPercentageRAY() {
	// Start selling
	const bundledTxns = [];
	const keypairs = loadKeypairs(); // Ensure this function is correctly defined to load your Keypairs

	let poolInfo: { [key: string]: any } = {};
	if (fs.existsSync(keyInfoPath)) {
		const data = fs.readFileSync(keyInfoPath, "utf-8");
		poolInfo = JSON.parse(data);
	}

	const lut = new PublicKey(poolInfo.addressLUT.toString());

	const lookupTableAccount = (await connection.getAddressLookupTable(lut)).value;

	if (lookupTableAccount == null) {
		console.log("Lookup table account not found!");
		process.exit(0);
	}

	const mintKp = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(poolInfo.mintPk)));
	//console.log(`Mint: ${mintKp.publicKey.toBase58()}`);

	const marketID = new PublicKey(prompt("Enter marketID of your migration: "));
	const supplyPercent = +prompt("Percentage to sell (Ex. 1 for 1%): ") / 100;
	const jitoTipAmt = +prompt("Jito tip in Sol (Ex. 0.01): ") * LAMPORTS_PER_SOL;

	if (supplyPercent > 0.25) {
		// protect investors and prevent fraud
		console.log("You cannot sell over 25% at a time.");
		console.log("The price impact is too high.");

		return;
	}

	const keys = await derivePoolKeys(marketID); // Ensure this function is correctly defined to derive necessary keys

	if (keys == null) {
		console.log("Keys not found!");
		process.exit(0);
	}

	const mintInfo = await connection.getTokenSupply(mintKp.publicKey);

	let sellTotalAmount = 0;

	const chunkedKeypairs = chunkArray(keypairs, 6); // Adjust chunk size as needed

	// start the selling process
	const PayerTokenATA = await spl.getAssociatedTokenAddress(new PublicKey(poolInfo.mint), payer.publicKey);

	const { blockhash } = await connection.getLatestBlockhash();

	for (let chunkIndex = 0; chunkIndex < chunkedKeypairs.length; chunkIndex++) {
		const chunk = chunkedKeypairs[chunkIndex];
		const instructionsForChunk = [];
		const isFirstChunk = chunkIndex === 0; // Check if this is the first chunk

		if (isFirstChunk) {
			// Handle the first chunk separately
			const transferAmount = await getSellBalance(wallet, new PublicKey(poolInfo.mint), supplyPercent);
			sellTotalAmount += transferAmount; // Keep track to sell at the end
			console.log(`Sending ${transferAmount / 1e6} from dev wallet.`);

			const ataIx = spl.createAssociatedTokenAccountIdempotentInstruction(payer.publicKey, PayerTokenATA, mintKp.publicKey);

			const TokenATA = await spl.getAssociatedTokenAddress(new PublicKey(poolInfo.mint), wallet.publicKey);
			const transferIx = spl.createTransferInstruction(TokenATA, PayerTokenATA, wallet.publicKey, transferAmount);

			instructionsForChunk.push(ataIx, transferIx);
		}

		for (let keypair of chunk) {
			const transferAmount = await getSellBalance(keypair, new PublicKey(poolInfo.mint), supplyPercent);
			sellTotalAmount += transferAmount; // Keep track to sell at the end
			console.log(`Sending ${transferAmount / 1e6} from ${keypair.publicKey.toString()}.`);

			const TokenATA = await spl.getAssociatedTokenAddress(new PublicKey(poolInfo.mint), keypair.publicKey);
			const transferIx = spl.createTransferInstruction(TokenATA, PayerTokenATA, keypair.publicKey, transferAmount);
			instructionsForChunk.push(transferIx);
		}

		if (instructionsForChunk.length > 0) {
			const message = new TransactionMessage({
				payerKey: payer.publicKey,
				recentBlockhash: blockhash,
				instructions: instructionsForChunk,
			}).compileToV0Message([lookupTableAccount]);

			const versionedTx = new VersionedTransaction(message);

			const serializedMsg = versionedTx.serialize();
			console.log("Txn size:", serializedMsg.length);
			if (serializedMsg.length > 1232) {
				console.log("tx too big");
			}

			versionedTx.sign([payer]); // Sign with payer first

			if (isFirstChunk) {
				versionedTx.sign([wallet]); // Sign with the dev wallet for the first chunk
			}

			bundledTxns.push(versionedTx);
		}
	}

	const payerNum = randomInt(0, 24);
	const payerKey = keypairs[payerNum];

	const sellPayerIxs = [];

	const PayerwSolATA = await spl.getAssociatedTokenAddress(spl.NATIVE_MINT, payer.publicKey);

	const { sellIxs } = makeSwap(keys, PayerwSolATA, PayerTokenATA, true, payer, sellTotalAmount);

	console.log(`TOTAL: Selling ${sellTotalAmount / 1e6}.`);

	if (+mintInfo.value.amount * 0.25 <= sellTotalAmount) {
		// protect investors from fraud and prevent illegal use
		console.log("Price impact too high.");
		console.log("Cannot sell more than 25% of supply at a time.");

		return;
	}

	sellPayerIxs.push(
		spl.createAssociatedTokenAccountIdempotentInstruction(payer.publicKey, PayerwSolATA, payer.publicKey, spl.NATIVE_MINT),
		...sellIxs,
		SystemProgram.transfer({
			fromPubkey: payer.publicKey,
			toPubkey: getRandomTipAccount(),
			lamports: BigInt(jitoTipAmt),
		})
	);

	const sellMessage = new TransactionMessage({
		payerKey: payerKey.publicKey,
		recentBlockhash: blockhash,
		instructions: sellPayerIxs,
	}).compileToV0Message([lookupTableAccount]);

	const sellTx = new VersionedTransaction(sellMessage);

	const serializedMsg = sellTx.serialize();
	console.log("Txn size:", serializedMsg.length);
	if (serializedMsg.length > 1232) {
		console.log("tx too big");
	}

	sellTx.sign([payer, payerKey]);

	bundledTxns.push(sellTx);

	await sendBundle(bundledTxns);

	return;
}

async function getSellBalance(keypair: Keypair, mint: PublicKey, supplyPercent: number) {
	let amount;
	try {
		const tokenAccountPubKey = spl.getAssociatedTokenAddressSync(mint, keypair.publicKey);
		const balance = await connection.getTokenAccountBalance(tokenAccountPubKey);
		amount = Math.floor(Number(balance.value.amount) * supplyPercent);
	} catch (e) {
		amount = 0;
	}

	return amount;
}

function makeSwap(poolKeys: IPoolKeys, wSolATA: PublicKey, TokenATA: PublicKey, reverse: boolean, keypair: Keypair, amountIn: number | bigint, minAmountOut = 0) {
	const account1 = spl.TOKEN_PROGRAM_ID; // token program
	const account2 = poolKeys.id; // amm id  writable
	const account3 = poolKeys.authority; // amm authority
	const account4 = poolKeys.openOrders; // amm open orders  writable
	const account5 = poolKeys.targetOrders; // amm target orders  writable
	const account6 = poolKeys.baseVault; // pool coin token account  writable  AKA baseVault
	const account7 = poolKeys.quoteVault; // pool pc token account  writable   AKA quoteVault
	const account8 = poolKeys.marketProgramId; // serum program id
	const account9 = poolKeys.marketId; //   serum market  writable
	const account10 = poolKeys.marketBids; // serum bids  writable
	const account11 = poolKeys.marketAsks; // serum asks  writable
	const account12 = poolKeys.marketEventQueue; // serum event queue  writable
	const account13 = poolKeys.marketBaseVault; // serum coin vault  writable     AKA marketBaseVault
	const account14 = poolKeys.marketQuoteVault; //   serum pc vault  writable    AKA marketQuoteVault
	const inAmount = amountIn;
	const minAmount = minAmountOut;
	let account16 = wSolATA; // user source token account  writable
	let account17 = TokenATA; // user dest token account   writable
	const account18 = keypair.publicKey; // user owner (signer)  writable

	if (reverse === true) {
		account16 = TokenATA;
		account17 = wSolATA;
	}

	const args = {
		amountIn: new BN(inAmount.toString()),
		minimumAmountOut: new BN(minAmount),
	};

	const buffer = Buffer.alloc(16);
	args.amountIn.toArrayLike(Buffer, "le", 8).copy(buffer, 0);
	args.minimumAmountOut.toArrayLike(Buffer, "le", 8).copy(buffer, 8);
	const prefix = Buffer.from([0x09]);
	const instructionData = Buffer.concat([prefix, buffer]);
	const accountMetas = [
		{ pubkey: account1, isSigner: false, isWritable: false },
		{ pubkey: account2, isSigner: false, isWritable: true },
		{ pubkey: account3, isSigner: false, isWritable: false },
		{ pubkey: account4, isSigner: false, isWritable: true },
		{ pubkey: account5, isSigner: false, isWritable: true },
		{ pubkey: account6, isSigner: false, isWritable: true },
		{ pubkey: account7, isSigner: false, isWritable: true },
		{ pubkey: account8, isSigner: false, isWritable: false },
		{ pubkey: account9, isSigner: false, isWritable: true },
		{ pubkey: account10, isSigner: false, isWritable: true },
		{ pubkey: account11, isSigner: false, isWritable: true },
		{ pubkey: account12, isSigner: false, isWritable: true },
		{ pubkey: account13, isSigner: false, isWritable: true },
		{ pubkey: account14, isSigner: false, isWritable: true },
		{ pubkey: account16, isSigner: false, isWritable: true },
		{ pubkey: account17, isSigner: false, isWritable: true },
		{ pubkey: account18, isSigner: true, isWritable: true },
	];

	const swap = new TransactionInstruction({
		keys: accountMetas,
		programId: RayLiqPoolv4,
		data: instructionData,
	});

	let buyIxs: TransactionInstruction[] = [];
	let sellIxs: TransactionInstruction[] = [];

	if (reverse === false) {
		buyIxs.push(swap);
	}

	if (reverse === true) {
		sellIxs.push(swap);
	}

	return { buyIxs, sellIxs };
}
