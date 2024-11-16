"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 群发 NFT 命令
*/
const web3_js_1 = require("@solana/web3.js");
const program = require('commander');
const sign_1 = require("../src/sign");
const MainnetUrl = "https://api.mainnet-beta.solana.com";
// 测试地址： BUxRsHy1vuMswkrCrLv21TjByQQQ8GAycVdFm5JW6f6L
program
    .option('-f, --from <from>', 'from address')
    .option('-t, --to <to>', 'to address')
    .option('-c, --nonceAccountAddress <nonceAccountAddress>', 'nonce account address')
    .option('-o, --authorAddress <authorAddress>', 'author address')
    .option('-p, --privateKeys <privateKeys>', 'private Key')
    .action(async (singCmd) => {
    let connection = new web3_js_1.Connection(MainnetUrl);
    const version = await connection.getVersion();
    console.log("connection established:", MainnetUrl, version);
    // NFT Token 列表
    const nftTokenAddressList = [];
    // 转账逻辑
    for (let i = 0; i < nftTokenAddressList.length; i++) {
        const nonceAcctInfo = await connection.getAccountInfo(new web3_js_1.PublicKey(singCmd.nonceAccountAddress));
        const nonceAccount = web3_js_1.NonceAccount.fromAccountData(nonceAcctInfo.data);
        const nonce = nonceAccount.nonce;
        const params = {
            txObj: {
                from: singCmd.from,
                amount: 1,
                to: singCmd.to,
                nonce: nonce,
                nonceAccountAddress: singCmd.nonceAccountAddress,
                authorAddress: singCmd.authorAddress,
                decimal: 0,
                txType: "TRANSFER_TOKEN",
                mintAddress: nftTokenAddressList[i],
                hasCreatedTokenAddr: true
            },
            privs: singCmd.privateKeys,
        };
        const txMsg = await (0, sign_1.signTransaction)(params);
        const txhash = await connection.sendEncodedTransaction(txMsg);
        console.log("txhash is ", txhash);
    }
});
program.
    parse(process.argv);
