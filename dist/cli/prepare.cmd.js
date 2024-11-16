"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 创建一个 Nonce 用户的命令, 可以使用，也可以不使用，建议使用，这样可以延长交易的有效期
 */
const program = require('commander');
const sign_1 = require("../src/sign");
const web3_js_1 = require("@solana/web3.js");
const MainnetUrl = "https://api.mainnet-beta.solana.com";
program
    .option('-a, --authorAddress <authorAddress>', 'author Address')
    .option('-f, --from <from>', 'from')
    .option('-p, --privateKeys <privateKeys>', 'private Key')
    .action(async (prepareCmd) => {
    let connection = new web3_js_1.Connection(MainnetUrl);
    const version = await connection.getVersion();
    console.log("connection established:", MainnetUrl, version);
    const recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    console.log("recentBlockhash is ", recentBlockhash);
    const minBalanceForRentExemption = await connection.getMinimumBalanceForRentExemption(web3_js_1.NONCE_ACCOUNT_LENGTH);
    console.log("minBalanceForRentExemption is ", minBalanceForRentExemption);
    const params = {
        txObj: {
            authorAddress: prepareCmd.authorAddress,
            from: prepareCmd.from,
            recentBlockhash: recentBlockhash,
            minBalanceForRentExemption: minBalanceForRentExemption
        },
        privs: prepareCmd.privateKeys,
    };
    const txMsg = (0, sign_1.prepareAccount)(params);
    const txhash = await connection.sendEncodedTransaction(txMsg);
    console.log("txhash is ", txhash);
});
program.
    parse(process.argv);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlcGFyZS5jbWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jbGkvcHJlcGFyZS5jbWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxzQ0FBNkM7QUFDN0MsNkNBR3lCO0FBRXpCLE1BQU0sVUFBVSxHQUFHLHFDQUFxQyxDQUFBO0FBRXhELE9BQU87S0FDRixNQUFNLENBQUMscUNBQXFDLEVBQUUsZ0JBQWdCLENBQUM7S0FDL0QsTUFBTSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQztLQUNuQyxNQUFNLENBQUMsaUNBQWlDLEVBQUUsYUFBYSxDQUFDO0tBQ3hELE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUU7SUFDekIsSUFBSSxVQUFVLEdBQUcsSUFBSSxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzVDLE1BQU0sT0FBTyxHQUFHLE1BQU0sVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRTVELE1BQU0sZUFBZSxHQUFHLENBQUMsTUFBTSxVQUFVLENBQUMsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGVBQWUsQ0FBQyxDQUFBO0lBRW5ELE1BQU0sMEJBQTBCLEdBQUcsTUFBTSxVQUFVLENBQUMsaUNBQWlDLENBQUMsOEJBQW9CLENBQUMsQ0FBQztJQUM1RyxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLDBCQUEwQixDQUFDLENBQUE7SUFFekUsTUFBTSxNQUFNLEdBQUc7UUFDWCxLQUFLLEVBQUU7WUFDSCxhQUFhLEVBQUUsVUFBVSxDQUFDLGFBQWE7WUFDdkMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJO1lBQ3JCLGVBQWUsRUFBRSxlQUFlO1lBQ2hDLDBCQUEwQixFQUFFLDBCQUEwQjtTQUN6RDtRQUNELEtBQUssRUFBRSxVQUFVLENBQUMsV0FBVztLQUNoQyxDQUFBO0lBQ0QsTUFBTSxLQUFLLEdBQUksSUFBQSxxQkFBYyxFQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLE1BQU0sVUFBVSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0FBQ3JDLENBQUMsQ0FBQyxDQUFBO0FBR04sT0FBTztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMifQ==