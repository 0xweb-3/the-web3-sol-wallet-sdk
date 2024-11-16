/*
 创建一个 Nonce 用户的命令, 可以使用，也可以不使用，建议使用，这样可以延长交易的有效期
 */
const program = require('commander');
import { prepareAccount } from "../src/sign";
import {
    Connection,
    NONCE_ACCOUNT_LENGTH
} from "@solana/web3.js";

const MainnetUrl = "https://api.mainnet-beta.solana.com"

program
    .option('-a, --authorAddress <authorAddress>', 'author Address')
    .option('-f, --from <from>', 'from')
    .option('-p, --privateKeys <privateKeys>', 'private Key')
    .action(async (prepareCmd) => {
        let connection = new Connection(MainnetUrl);
        const version = await connection.getVersion();
        console.log("connection established:", MainnetUrl, version);

        const recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        console.log("recentBlockhash is ", recentBlockhash)

        const minBalanceForRentExemption = await connection.getMinimumBalanceForRentExemption(NONCE_ACCOUNT_LENGTH);
        console.log("minBalanceForRentExemption is ", minBalanceForRentExemption)

        const params = {
            txObj: {
                authorAddress: prepareCmd.authorAddress,
                from: prepareCmd.from,
                recentBlockhash: recentBlockhash,
                minBalanceForRentExemption: minBalanceForRentExemption
            },
            privs: prepareCmd.privateKeys,
        }
        const txMsg =  prepareAccount(params)
        const txhash = await connection.sendEncodedTransaction(txMsg);
        console.log("txhash is ", txhash)
    })


program.
    parse(process.argv);

