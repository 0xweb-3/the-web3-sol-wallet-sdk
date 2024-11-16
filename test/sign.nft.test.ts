import { prepareAccount, signTransaction } from "../src/sign";


describe('nft send test', ()=>{
    test('prepare account',  async()=>{
        const authPrivateKey = 'f464f9d6f87e3feece82bcf7509a99adbf9c3f38c8fb30c77ae6a92360a45f656488e3d824c6eb210b97f7f5c49d2e5f0ff63b289f2b2f861af31fa09421163d'
        const fromPrivateKey = '6643b949889be7bce4727e7231a6a36c66df224a1344e67c79487976a05b750cd890ba031933d8ef8a7259adee3a7b40b2a5702d2439e804b06a012e9ccfdd50'
        const params =  {
            txObj: {
                authorAddress: "7mSqVJpb8ziMDB7yDAEajeANyDosh1WK5ksS6mCdDHRE",
                from: "FaP4Ti84eCuGibYNeGMTKCZW9YyyZHgoSB6nFViGtBdy",
                recentBlockhash: "2iQ3gjxc4FB6MTGjkf16uVvxG8qaBfPjXjGGQQbaEANV",
                minBalanceForRentExemption: "1638880",
            },
            privs: [
                {
                    address: "7mSqVJpb8ziMDB7yDAEajeANyDosh1WK5ksS6mCdDHRE",
                    key: authPrivateKey
                }, {
                    address: "FaP4Ti84eCuGibYNeGMTKCZW9YyyZHgoSB6nFViGtBdy",
                    key: fromPrivateKey
                }
            ]
        }
        let tx_msg =  prepareAccount(params)
        console.log("tx_msg===", tx_msg)
    });

    // NFT 交易签名测试
    test('SignTransaction', async ()=>{
        const authPrivateKey = 'f464f9d6f87e3feece82bcf7509a99adbf9c3f38c8fb30c77ae6a92360a45f656488e3d824c6eb210b97f7f5c49d2e5f0ff63b289f2b2f861af31fa09421163d'
        const fromPrivateKey = '147908be03cee4057ba306da2ea1c3afd26a79f6da5390ab41ebddcda350c7a2bf8047b999003ac1a26acc858d5ee4da64621099a558919e4e330c01ca291da7'
        let from  = "DtYKfuXgffgU21TfDcPWw3XYZwqv1TiDSkosePBwG5YS";
        let to = "9Q3wq576tNcYu1Z4sMG8Ea2KNUtUfQ2WCAzcATBqVD16"
        let nonceAccountAddress = "FaP4Ti84eCuGibYNeGMTKCZW9YyyZHgoSB6nFViGtBdy"
        let authorAddress = "7mSqVJpb8ziMDB7yDAEajeANyDosh1WK5ksS6mCdDHRE"
        let mintAddress = "6bkSpihx773QNWEz7mpvtv8A5d2qNu4sZVGP1ghMuJm3";
        const params =  {
            txObj: {
                from: from,
                amount: "1",
                to: to,
                nonce: "EzktKfV35J6ogsfwQhDftTZxxTDLnJ5vctgFnWhvisup",
                nonceAccountAddress: nonceAccountAddress,
                authorAddress: authorAddress,
                decimal: 0,
                mintAddress: mintAddress,
                txType: "TRANSFER_TOKEN",
                hasCreatedTokenAddr: false
            },
            privs: [
                {address: from, key: fromPrivateKey},
                {address: authorAddress, key: authPrivateKey}
            ]
        }
        let tx_msg = await signTransaction(params)
        console.log("tx_msg===", tx_msg)
    });
})

/*
const privKeys = [
    {"address": "FaP4Ti84eCuGibYNeGMTKCZW9YyyZHgoSB6nFViGtBdy", "key": "6643b949889be7bce4727e7231a6a36c66df224a1344e67c79487976a05b750cd890ba031933d8ef8a7259adee3a7b40b2a5702d2439e804b06a012e9ccfdd50"},
    {"address": "7mSqVJpb8ziMDB7yDAEajeANyDosh1WK5ksS6mCdDHRE", "key": "f464f9d6f87e3feece82bcf7509a99adbf9c3f38c8fb30c77ae6a92360a45f656488e3d824c6eb210b97f7f5c49d2e5f0ff63b289f2b2f861af31fa09421163d"},
    {"address": "DtYKfuXgffgU21TfDcPWw3XYZwqv1TiDSkosePBwG5YS", "key": "147908be03cee4057ba306da2ea1c3afd26a79f6da5390ab41ebddcda350c7a2bf8047b999003ac1a26acc858d5ee4da64621099a558919e4e330c01ca291da7"}
]
 */


