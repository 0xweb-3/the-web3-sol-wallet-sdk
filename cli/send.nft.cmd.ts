/*
 群发 NFT 命令
*/
import {
    Connection,
    NonceAccount,
    PublicKey
} from "@solana/web3.js";
const program = require('commander');
import { signTransaction } from "../src/sign";

const MainnetUrl = "https://api.mainnet-beta.solana.com"

// 测试地址： BUxRsHy1vuMswkrCrLv21TjByQQQ8GAycVdFm5JW6f6L

program
    .option('-f, --from <from>', 'from address')
    .option('-t, --to <to>', 'to address')
    .option('-c, --nonceAccountAddress <nonceAccountAddress>', 'nonce account address')
    .option('-o, --authorAddress <authorAddress>', 'author address')
    .option('-p, --privateKeys <privateKeys>', 'private Key')
    .action(async (singCmd) => {
        let connection = new Connection(MainnetUrl);
        const version = await connection.getVersion();
        console.log("connection established:", MainnetUrl, version);

        // NFT Token 列表
        const nftTokenAddressList = []

        // 转账逻辑
        for(let i = 0; i < nftTokenAddressList.length; i++ ) {
            const nonceAcctInfo = await connection.getAccountInfo(new PublicKey(singCmd.nonceAccountAddress));
            const nonceAccount = NonceAccount.fromAccountData(nonceAcctInfo.data);
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
            }
            const txMsg = await signTransaction(params)
            const txhash = await connection.sendEncodedTransaction(txMsg);
            console.log("txhash is ", txhash);
        }
    })

program.
parse(process.argv);


