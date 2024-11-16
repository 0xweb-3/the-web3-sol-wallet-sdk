import "regenerator-runtime/runtime";
import {Keypair, NONCE_ACCOUNT_LENGTH, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";

const BigNumber = require("bignumber.js");


export async function signTransaction(params){
    const {
        txObj:{from, amount, to, nonce, nonceAccountAddress, authorAddress, decimal, txType, mintAddress, hasCreatedTokenAddr},
        privs,
    } = params;
    const privateKey = (privs?.find(ele=>ele.address===from))?.key;
    if(!privateKey) throw new Error("privateKey 为空");
    const authorPrivateKey = (privs?.find(ele=>ele.address===authorAddress))?.key;
    if(!authorPrivateKey) throw new Error("authorPrivateKey 为空");

    // privateKey从hex转化为uint8array，生成feePayer
    const feePayer = Keypair.fromSecretKey(new Uint8Array(Buffer.from(privateKey, "hex")));
    // 生成授权账号
    const author = Keypair.fromSecretKey(new Uint8Array(Buffer.from(authorPrivateKey, "hex")));

    const calcAmount = new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString();
    // check if calcAmount is a float number
    if (calcAmount.indexOf(".") !== -1) throw new Error("decimal 无效");

    // 生成一个nonce交易
    let tx = new Transaction();
    let tx1 = new Transaction();
    const toPubkey = new PublicKey(to);
    const fromPubkey = new PublicKey(from);
    if(txType==="TRANSFER_TOKEN"){
        const mint = new PublicKey(mintAddress);
        const fromTokenAccount = await SPLToken.Token.getAssociatedTokenAddress(
            SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL
            SPLToken.TOKEN_PROGRAM_ID, // TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
            mint,
            fromPubkey
        );
        const toTokenAccount = await SPLToken.Token.getAssociatedTokenAddress(
            SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
            SPLToken.TOKEN_PROGRAM_ID,
            mint,
            toPubkey
        );
        tx.add(
            SystemProgram.nonceAdvance({
                noncePubkey: new PublicKey(nonceAccountAddress),
                authorizedPubkey: author.publicKey,
            }),
            SPLToken.Token.createTransferInstruction(
                SPLToken.TOKEN_PROGRAM_ID,
                fromTokenAccount, // ata
                toTokenAccount, // ata
                fromPubkey, // from pubkey
                [feePayer, author], // mutiple signers需要带
                calcAmount
            ),
        );
        if(!hasCreatedTokenAddr){
            tx1.add(
                SystemProgram.nonceAdvance({
                    noncePubkey: new PublicKey(nonceAccountAddress),
                    authorizedPubkey: author.publicKey,
                }),
                SPLToken.Token.createAssociatedTokenAccountInstruction(
                    SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID,
                    SPLToken.TOKEN_PROGRAM_ID,
                    mint,
                    toTokenAccount, // 要创建的token account
                    toPubkey,
                    feePayer.publicKey
                ),
                SPLToken.Token.createTransferInstruction(
                    SPLToken.TOKEN_PROGRAM_ID,
                    fromTokenAccount, // ata
                    toTokenAccount, // ata
                    fromPubkey, // from pubkey
                    [feePayer, author], // mutiple signers需要带
                    calcAmount
                )
            );
        }
    }else{
        tx.add(
            SystemProgram.nonceAdvance({
                noncePubkey: new PublicKey(nonceAccountAddress),
                authorizedPubkey: author.publicKey,
            }),
            SystemProgram.transfer({
                fromPubkey: feePayer.publicKey,
                toPubkey: toPubkey,
                lamports: calcAmount,
            })
        );
    }
    tx.recentBlockhash = nonce;
    tx.sign(feePayer, author);
    const serializeMsg = tx.serialize().toString("base64");
    if(txType==="TRANSFER_TOKEN"){
        if(!hasCreatedTokenAddr){
            tx1.recentBlockhash = nonce;
            tx1.sign(feePayer, author);
            const serializeMsg1 = tx1.serialize().toString("base64");

            return JSON.stringify([serializeMsg1, serializeMsg]);
        }else{
            return JSON.stringify([serializeMsg]);
        }
    }
    return serializeMsg;
}


export function prepareAccount(params){
    const {
        txObj:{authorAddress, from, recentBlockhash, minBalanceForRentExemption},
        privs,
    } = params;
    const authorPrivateKey = (privs?.find(ele=>ele.address===authorAddress))?.key;
    if(!authorPrivateKey) throw new Error("authorPrivateKey 为空");
    const nonceAcctPrivateKey = (privs?.find(ele=>ele.address===from))?.key;
    if(!nonceAcctPrivateKey) throw new Error("nonceAcctPrivateKey 为空");
    const author = Keypair.fromSecretKey(new Uint8Array(Buffer.from(authorPrivateKey, "hex")));
    const nonceAccount = Keypair.fromSecretKey(new Uint8Array(Buffer.from(nonceAcctPrivateKey, "hex")));
    let tx = new Transaction();
    tx.add(
        SystemProgram.createAccount({
            fromPubkey: author.publicKey,
            newAccountPubkey: nonceAccount.publicKey,
            lamports: minBalanceForRentExemption,
            space: NONCE_ACCOUNT_LENGTH,
            programId: SystemProgram.programId,
        }),
        SystemProgram.nonceInitialize({
            noncePubkey: nonceAccount.publicKey,  // nonce account pubkey
            authorizedPubkey: author.publicKey, // 这个auth就是之后要更新nonce的auth
        })
    );
    tx.recentBlockhash = recentBlockhash;
    tx.sign(author, nonceAccount);
    return tx.serialize().toString("base64");
}
