/*
 签名命令行
*/
const program = require('commander');
import { signTransaction } from "../src/sign";


program
    .option('-f, --from <from>', 'from address')
    .option('-a, --amount <amount>', 'transfer amount')
    .option('-t, --to <to>', 'to address')
    .option('-n, --nonce <nonce>', 'transfer nonce')
    .option('-c, --nonceAccountAddress <nonceAccountAddress>', 'nonce account address')
    .option('-o, --authorAddress <authorAddress>', 'author address')
    .option('-d, --decimal <decimal>', 'coin decimal')
    .option('-t, --txType <txType>', 'tx type')
    .option('-m, --mintAddress <mintAddress>', 'mint address')
    .option('-h, --hasCreatedTokenAddr <hasCreatedTokenAddr>', 'has created token address')
    .option('-p, --privateKeys <privateKeys>', 'private Key')
    .action((singCmd) => {
        const params = {
            txObj:{
                from: singCmd.from,
                amount: singCmd.amount,
                to: singCmd.to,
                nonce: singCmd.nonce,
                nonceAccountAddress: singCmd.nonceAccountAddress,
                authorAddress: singCmd.authorAddress,
                decimal: singCmd.decimal,
                txType: singCmd.txType,
                mintAddress: singCmd.mintAddress,
                hasCreatedTokenAddr: singCmd.hasCreatedTokenAddr
            },
            privs: singCmd.privateKeys,
        }
        return signTransaction(params)
    })

program.
parse(process.argv);


