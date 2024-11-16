"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareAccount = exports.signTransaction = void 0;
require("regenerator-runtime/runtime");
const web3_js_1 = require("@solana/web3.js");
const SPLToken = require("@solana/spl-token");
const BigNumber = require("bignumber.js");
async function signTransaction(params) {
    var _a, _b;
    const { txObj: { from, amount, to, nonce, nonceAccountAddress, authorAddress, decimal, txType, mintAddress, hasCreatedTokenAddr }, privs, } = params;
    const privateKey = (_a = (privs === null || privs === void 0 ? void 0 : privs.find(ele => ele.address === from))) === null || _a === void 0 ? void 0 : _a.key;
    if (!privateKey)
        throw new Error("privateKey 为空");
    const authorPrivateKey = (_b = (privs === null || privs === void 0 ? void 0 : privs.find(ele => ele.address === authorAddress))) === null || _b === void 0 ? void 0 : _b.key;
    if (!authorPrivateKey)
        throw new Error("authorPrivateKey 为空");
    // privateKey从hex转化为uint8array，生成feePayer
    const feePayer = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(privateKey, "hex")));
    // 生成授权账号
    const author = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(authorPrivateKey, "hex")));
    const calcAmount = new BigNumber(amount).times(new BigNumber(10).pow(decimal)).toString();
    // check if calcAmount is a float number
    if (calcAmount.indexOf(".") !== -1)
        throw new Error("decimal 无效");
    // 生成一个nonce交易
    let tx = new web3_js_1.Transaction();
    let tx1 = new web3_js_1.Transaction();
    const toPubkey = new web3_js_1.PublicKey(to);
    const fromPubkey = new web3_js_1.PublicKey(from);
    if (txType === "TRANSFER_TOKEN") {
        const mint = new web3_js_1.PublicKey(mintAddress);
        const fromTokenAccount = await SPLToken.Token.getAssociatedTokenAddress(SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, // ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL
        SPLToken.TOKEN_PROGRAM_ID, // TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
        mint, fromPubkey);
        const toTokenAccount = await SPLToken.Token.getAssociatedTokenAddress(SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, SPLToken.TOKEN_PROGRAM_ID, mint, toPubkey);
        tx.add(web3_js_1.SystemProgram.nonceAdvance({
            noncePubkey: new web3_js_1.PublicKey(nonceAccountAddress),
            authorizedPubkey: author.publicKey,
        }), SPLToken.Token.createTransferInstruction(SPLToken.TOKEN_PROGRAM_ID, fromTokenAccount, // ata
        toTokenAccount, // ata
        fromPubkey, // from pubkey
        [feePayer, author], // mutiple signers需要带
        calcAmount));
        if (!hasCreatedTokenAddr) {
            tx1.add(web3_js_1.SystemProgram.nonceAdvance({
                noncePubkey: new web3_js_1.PublicKey(nonceAccountAddress),
                authorizedPubkey: author.publicKey,
            }), SPLToken.Token.createAssociatedTokenAccountInstruction(SPLToken.ASSOCIATED_TOKEN_PROGRAM_ID, SPLToken.TOKEN_PROGRAM_ID, mint, toTokenAccount, // 要创建的token account
            toPubkey, feePayer.publicKey), SPLToken.Token.createTransferInstruction(SPLToken.TOKEN_PROGRAM_ID, fromTokenAccount, // ata
            toTokenAccount, // ata
            fromPubkey, // from pubkey
            [feePayer, author], // mutiple signers需要带
            calcAmount));
        }
    }
    else {
        tx.add(web3_js_1.SystemProgram.nonceAdvance({
            noncePubkey: new web3_js_1.PublicKey(nonceAccountAddress),
            authorizedPubkey: author.publicKey,
        }), web3_js_1.SystemProgram.transfer({
            fromPubkey: feePayer.publicKey,
            toPubkey: toPubkey,
            lamports: calcAmount,
        }));
    }
    tx.recentBlockhash = nonce;
    tx.sign(feePayer, author);
    const serializeMsg = tx.serialize().toString("base64");
    if (txType === "TRANSFER_TOKEN") {
        if (!hasCreatedTokenAddr) {
            tx1.recentBlockhash = nonce;
            tx1.sign(feePayer, author);
            const serializeMsg1 = tx1.serialize().toString("base64");
            return JSON.stringify([serializeMsg1, serializeMsg]);
        }
        else {
            return JSON.stringify([serializeMsg]);
        }
    }
    return serializeMsg;
}
exports.signTransaction = signTransaction;
function prepareAccount(params) {
    var _a, _b;
    const { txObj: { authorAddress, from, recentBlockhash, minBalanceForRentExemption }, privs, } = params;
    const authorPrivateKey = (_a = (privs === null || privs === void 0 ? void 0 : privs.find(ele => ele.address === authorAddress))) === null || _a === void 0 ? void 0 : _a.key;
    if (!authorPrivateKey)
        throw new Error("authorPrivateKey 为空");
    const nonceAcctPrivateKey = (_b = (privs === null || privs === void 0 ? void 0 : privs.find(ele => ele.address === from))) === null || _b === void 0 ? void 0 : _b.key;
    if (!nonceAcctPrivateKey)
        throw new Error("nonceAcctPrivateKey 为空");
    const author = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(authorPrivateKey, "hex")));
    const nonceAccount = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(nonceAcctPrivateKey, "hex")));
    let tx = new web3_js_1.Transaction();
    tx.add(web3_js_1.SystemProgram.createAccount({
        fromPubkey: author.publicKey,
        newAccountPubkey: nonceAccount.publicKey,
        lamports: minBalanceForRentExemption,
        space: web3_js_1.NONCE_ACCOUNT_LENGTH,
        programId: web3_js_1.SystemProgram.programId,
    }), web3_js_1.SystemProgram.nonceInitialize({
        noncePubkey: nonceAccount.publicKey,
        authorizedPubkey: author.publicKey, // 这个auth就是之后要更新nonce的auth
    }));
    tx.recentBlockhash = recentBlockhash;
    tx.sign(author, nonceAccount);
    const serializeMsg = tx.serialize().toString("base64");
    return serializeMsg;
}
exports.prepareAccount = prepareAccount;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zaWduLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHVDQUFxQztBQUNyQyw2Q0FBaUc7QUFDakcsOENBQThDO0FBQzlDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUduQyxLQUFLLFVBQVUsZUFBZSxDQUFDLE1BQU07O0lBQ3hDLE1BQU0sRUFDRixLQUFLLEVBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFDLEVBQ3RILEtBQUssR0FDUixHQUFHLE1BQU0sQ0FBQztJQUNYLE1BQU0sVUFBVSxHQUFHLE1BQUEsQ0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQSxFQUFFLENBQUEsR0FBRyxDQUFDLE9BQU8sS0FBRyxJQUFJLENBQUMsQ0FBQywwQ0FBRSxHQUFHLENBQUM7SUFDL0QsSUFBRyxDQUFDLFVBQVU7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pELE1BQU0sZ0JBQWdCLEdBQUcsTUFBQSxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFBLEVBQUUsQ0FBQSxHQUFHLENBQUMsT0FBTyxLQUFHLGFBQWEsQ0FBQyxDQUFDLDBDQUFFLEdBQUcsQ0FBQztJQUM5RSxJQUFHLENBQUMsZ0JBQWdCO1FBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBRTdELHlDQUF5QztJQUN6QyxNQUFNLFFBQVEsR0FBRyxpQkFBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxL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