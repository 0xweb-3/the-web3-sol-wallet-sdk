"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 签名命令行
*/
const program = require('commander');
const sign_1 = require("../src/sign");
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
        txObj: {
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
    };
    return (0, sign_1.signTransaction)(params);
});
program.
    parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbi5jbWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jbGkvc2lnbi5jbWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7RUFFRTtBQUNGLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxzQ0FBOEM7QUFHOUMsT0FBTztLQUNGLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxjQUFjLENBQUM7S0FDM0MsTUFBTSxDQUFDLHVCQUF1QixFQUFFLGlCQUFpQixDQUFDO0tBQ2xELE1BQU0sQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDO0tBQ3JDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQztLQUMvQyxNQUFNLENBQUMsaURBQWlELEVBQUUsdUJBQXVCLENBQUM7S0FDbEYsTUFBTSxDQUFDLHFDQUFxQyxFQUFFLGdCQUFnQixDQUFDO0tBQy9ELE1BQU0sQ0FBQyx5QkFBeUIsRUFBRSxjQUFjLENBQUM7S0FDakQsTUFBTSxDQUFDLHVCQUF1QixFQUFFLFNBQVMsQ0FBQztLQUMxQyxNQUFNLENBQUMsaUNBQWlDLEVBQUUsY0FBYyxDQUFDO0tBQ3pELE1BQU0sQ0FBQyxpREFBaUQsRUFBRSwyQkFBMkIsQ0FBQztLQUN0RixNQUFNLENBQUMsaUNBQWlDLEVBQUUsYUFBYSxDQUFDO0tBQ3hELE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO0lBQ2hCLE1BQU0sTUFBTSxHQUFHO1FBQ1gsS0FBSyxFQUFDO1lBQ0YsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO1lBQ2xCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDZCxLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLG1CQUFtQjtZQUNoRCxhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWE7WUFDcEMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1lBQ3hCLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTTtZQUN0QixXQUFXLEVBQUUsT0FBTyxDQUFDLFdBQVc7WUFDaEMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLG1CQUFtQjtTQUNuRDtRQUNELEtBQUssRUFBRSxPQUFPLENBQUMsV0FBVztLQUM3QixDQUFBO0lBQ0QsT0FBTyxJQUFBLHNCQUFlLEVBQUMsTUFBTSxDQUFDLENBQUE7QUFDbEMsQ0FBQyxDQUFDLENBQUE7QUFFTixPQUFPO0lBQ1AsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyJ9