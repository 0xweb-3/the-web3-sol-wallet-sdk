"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withdrawFunds = exports.deactivateStake = exports.delegateStake = exports.createAccount = void 0;
const web3_js_1 = require("@solana/web3.js");
// 创建质押账户
async function createAccount() {
    let tx = new web3_js_1.Transaction();
    const priv = "d9acad686f03b1bb5054fb8b4c35a96f22dee45372e4c5ed9751373486d02399259e184f5c7cecf261063dd298e250b2303cf896a3d6705eedd35cc8b97cee9b";
    const fromPublicKey = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv, "hex")));
    let stakeAccount = web3_js_1.Keypair.generate();
    const secretKey = stakeAccount.secretKey;
    let secretKeyHex = Buffer.from(secretKey).toString('hex');
    console.log("secretKeyHex===", secretKeyHex);
    console.log("publicKey===", stakeAccount.publicKey.toString());
    let authorizedAccount = fromPublicKey;
    let lamportsForStakeAccount = 12388800;
    let createAccountTransaction = web3_js_1.StakeProgram.createAccount({
        fromPubkey: fromPublicKey.publicKey,
        authorized: new web3_js_1.Authorized(authorizedAccount.publicKey, authorizedAccount.publicKey),
        lamports: lamportsForStakeAccount,
        lockup: new web3_js_1.Lockup(0, 0, fromPublicKey.publicKey),
        stakePubkey: stakeAccount.publicKey
    });
    tx.add(createAccountTransaction);
    tx.recentBlockhash = "F7i9vw8taJvVJntB7nV8CMf4tNskmxwnLJSCFosGgofZ";
    tx.sign(fromPublicKey, stakeAccount);
    const serializeMsg = tx.serialize().toString("base64");
    console.log("serializeMsg====", serializeMsg);
}
exports.createAccount = createAccount;
// 转移投票权
async function delegateStake() {
    let tx = new web3_js_1.Transaction();
    const priv1 = "d9acad686f03b1bb5054fb8b4c35a96f22dee45372e4c5ed9751373486d02399259e184f5c7cecf261063dd298e250b2303cf896a3d6705eedd35cc8b97cee9b";
    const authorizedAccount = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv1, "hex")));
    const priv2 = "ceb2f732049d15bd5f5fe6ba943c5206ad8c2d423d82b342818e9a7ac9c6c4cf61dd07acef8408c1c8766a330341d19cb19f770c378c07444368a2b41353a5b8";
    const stakeAccount = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv2, "hex")));
    let votePubkey = new web3_js_1.PublicKey("FKsC411dik9ktS6xPADxs4Fk2SCENvAiuccQHLAPndvk");
    let delegateTransaction = web3_js_1.StakeProgram.delegate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: authorizedAccount.publicKey,
        votePubkey: votePubkey,
    });
    tx.add(delegateTransaction);
    tx.recentBlockhash = "Hq6d9jBrs6RHtAbFFy4beYPjx6fggVKETeeahC9jBPGK";
    tx.sign(authorizedAccount, stakeAccount);
    const serializeMsg = tx.serialize().toString("base64");
    console.log("serializeMsg====", serializeMsg);
}
exports.delegateStake = delegateStake;
function deactivateStake() {
    let tx = new web3_js_1.Transaction();
    const priv1 = "d9acad686f03b1bb5054fb8b4c35a96f22dee45372e4c5ed9751373486d02399259e184f5c7cecf261063dd298e250b2303cf896a3d6705eedd35cc8b97cee9b";
    const authorizedAccount = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv1, "hex")));
    const priv2 = "ceb2f732049d15bd5f5fe6ba943c5206ad8c2d423d82b342818e9a7ac9c6c4cf61dd07acef8408c1c8766a330341d19cb19f770c378c07444368a2b41353a5b8";
    const stakeAccount = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv2, "hex")));
    let deactivateTransaction = web3_js_1.StakeProgram.deactivate({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: authorizedAccount.publicKey,
    });
    tx.add(deactivateTransaction);
    tx.recentBlockhash = "AScJ4TVPF26EF82mLtv5R5SJYgCB3FhaHnLVEAdjKtx7";
    tx.sign(authorizedAccount, stakeAccount);
    const serializeMsg = tx.serialize().toString("base64");
    console.log("serializeMsg====", serializeMsg);
}
exports.deactivateStake = deactivateStake;
function withdrawFunds() {
    let tx = new web3_js_1.Transaction();
    const priv1 = "d9acad686f03b1bb5054fb8b4c35a96f22dee45372e4c5ed9751373486d02399259e184f5c7cecf261063dd298e250b2303cf896a3d6705eedd35cc8b97cee9b";
    const authorizedAccount = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv1, "hex")));
    const priv2 = "ceb2f732049d15bd5f5fe6ba943c5206ad8c2d423d82b342818e9a7ac9c6c4cf61dd07acef8408c1c8766a330341d19cb19f770c378c07444368a2b41353a5b8";
    const stakeAccount = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv2, "hex")));
    const priv = "d9acad686f03b1bb5054fb8b4c35a96f22dee45372e4c5ed9751373486d02399259e184f5c7cecf261063dd298e250b2303cf896a3d6705eedd35cc8b97cee9b";
    const fromPublicKey = web3_js_1.Keypair.fromSecretKey(new Uint8Array(Buffer.from(priv, "hex")));
    const stakeBalance = 1010592;
    let withdrawTransaction = web3_js_1.StakeProgram.withdraw({
        stakePubkey: stakeAccount.publicKey,
        authorizedPubkey: authorizedAccount.publicKey,
        toPubkey: fromPublicKey.publicKey,
        lamports: stakeBalance,
    });
    tx.add(withdrawTransaction);
    tx.recentBlockhash = "2453A3Kep5d1kmoNP5p5i9NPhmhZANe7q6rDU8TUPRqj";
    tx.sign(authorizedAccount, stakeAccount);
    const serializeMsg = tx.serialize().toString("base64");
    console.log("serializeMsg====", serializeMsg);
}
exports.withdrawFunds = withdrawFunds;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdGFraW5nL2FjY291bnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBT3lCO0FBR3pCLFNBQVM7QUFDRixLQUFLLFVBQVUsYUFBYTtJQUMvQixJQUFJLEVBQUUsR0FBRyxJQUFJLHFCQUFXLEVBQUUsQ0FBQztJQUMzQixNQUFNLElBQUksR0FBRyxrSUFBa0ksQ0FBQTtJQUMvSSxNQUFNLGFBQWEsR0FBRyxpQkFBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEYsSUFBSSxZQUFZLEdBQUcsaUJBQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN0QyxNQUFNLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFBO0lBQ3hDLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFELE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDLENBQUE7SUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQzlELElBQUksaUJBQWlCLEdBQUcsYUFBYSxDQUFDO0lBQ3RDLElBQUksdUJBQXVCLEdBQUcsUUFBUSxDQUFDO0lBQ3ZDLElBQUksd0JBQXdCLEdBQUcsc0JBQVksQ0FBQyxhQUFhLENBQUM7UUFDdEQsVUFBVSxFQUFFLGFBQWEsQ0FBQyxTQUFTO1FBQ25DLFVBQVUsRUFBRSxJQUFJLG9CQUFVLENBQUMsaUJBQWlCLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLFNBQVMsQ0FBQztRQUNwRixRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLE1BQU0s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