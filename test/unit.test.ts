const bs58 = require("bs58")
const bip39 =  require("bip39")
const { derivePath, getPublicKey } = require('ed25519-hd-key')
import {createAccount, delegateStake, deactivateStake, withdrawFunds } from '../src/staking/account'

/*
edPrivKey d9acad686f03b1bb5054fb8b4c35a96f22dee45372e4c5ed9751373486d02399259e184f5c7cecf261063dd298e250b2303cf896a3d6705eedd35cc8b97cee9b
edPubKey 259e184f5c7cecf261063dd298e250b2303cf896a3d6705eedd35cc8b97cee9b
 */

/*
 * PrivateKey: 55a70321542da0b6123f37180e61993d5769f0a5d727f9c817151c1270c290963a7b3874ba467be6b81ea361e3d7453af8b81c88aedd24b5031fdda0bc71ad32
 * PublicKey: 3a7b3874ba467be6b81ea361e3d7453af8b81c88aedd24b5031fdda0bc71ad32
 */
describe('CreateStakeAccount', ()=>{
    test('public key to address', async () => {
        const pubKey = "3a7b3874ba467be6b81ea361e3d7453af8b81c88aedd24b5031fdda0bc71ad32"
        const buffer = Buffer.from(pubKey, "hex");
        console.log(bs58.encode(buffer))
    });



    // {"privateKey":"ae7aebb8767bb0117f2034c6f13a971a8327676092b30d87cd069620deaa133a0eb55ff73c71d436f86e2388ff8ebc55e77a1a5ffa6e4a5c56cdb3517f25c0e0","publicKey":"zR7mJw3XcK6HyYCwrK8Cmu1fCS4AF2DTFmXJ7za5ibR","address":"zR7mJw3XcK6HyYCwrK8Cmu1fCS4AF2DTFmXJ7za5ibR"}
    test('create stake account', async () => {
        const params = {
            authorPrivateKey: "55a70321542da0b6123f37180e61993d5769f0a5d727f9c817151c1270c290963a7b3874ba467be6b81ea361e3d7453af8b81c88aedd24b5031fdda0bc71ad32",
            stakeAccountPrivateKey: "ae7aebb8767bb0117f2034c6f13a971a8327676092b30d87cd069620deaa133a0eb55ff73c71d436f86e2388ff8ebc55e77a1a5ffa6e4a5c56cdb3517f25c0e0",
            lamportsForStakeAccount: 19947680,
            recentBlockhash: "EusW5Ltz8HsaG4nqaWA7aMo6cq5hJpf7z9eGcTeYifQS",
            votePubkeyStr: "7PmWxxiTneGteGxEYvzj5pGDVMQ4nuN9DfUypEXmaA8o"
        }
        const txSignHex = await createAccount(params)
        console.log("txSignHex==", txSignHex)
    });


    test('delegate stake', async () => {
        const params = {
            authorPrivateKey: "55a70321542da0b6123f37180e61993d5769f0a5d727f9c817151c1270c290963a7b3874ba467be6b81ea361e3d7453af8b81c88aedd24b5031fdda0bc71ad32",
            stakeAccountPrivateKey: "cf5b9e12e56fdf6bcf6b408f169be215f9e2d0f0cd5590285eaede2c6edb3aa066a342b49147765b89df0d6234580323f989cca3cce7af8178b33795c7ef5d72",
            recentBlockhash: "3uPa3SjN9SRjbsJT9HVN7q6cKoQr27e8rHrh1c8qwAca",
            votePubkeyStr: "7PmWxxiTneGteGxEYvzj5pGDVMQ4nuN9DfUypEXmaA8o"
        }
        const txSignHex =  await delegateStake(params)
        console.log("txSignHex==", txSignHex)

    });


    test('deactivate stake', async () => {
        const params = {
            authorPrivateKey: "55a70321542da0b6123f37180e61993d5769f0a5d727f9c817151c1270c290963a7b3874ba467be6b81ea361e3d7453af8b81c88aedd24b5031fdda0bc71ad32",
            stakeAccountPrivateKey: "0644b2bed9fb8ddd88268c13d36c9e876fe72422f7ffa032cca62b4865785eb5d31074de1724720bc15860b7753b514bee38510630a908b68f59d10f0f7ea7e0",
            recentBlockhash: "C4L6FyFLeH1tryUtLcSNNi8WUyRVUfKyhrQGBxS8i7RA",
        }
        const txSignHex =  await deactivateStake(params)
        console.log("txSignHex==", txSignHex)
    });

    test('withdraw funds', async () => {
        const params = {
            authorPrivateKey: "55a70321542da0b6123f37180e61993d5769f0a5d727f9c817151c1270c290963a7b3874ba467be6b81ea361e3d7453af8b81c88aedd24b5031fdda0bc71ad32",
            stakeAccountPrivateKey: "0644b2bed9fb8ddd88268c13d36c9e876fe72422f7ffa032cca62b4865785eb5d31074de1724720bc15860b7753b514bee38510630a908b68f59d10f0f7ea7e0",
            recentBlockhash: "5Sqn7oLnVRkkdFV2Dy1hiR1HnUJusuvBQ8NFP4yXJH8j",
            stakeBalance: 1010592,
        }
        const txSignHex =  await withdrawFunds(params)
        console.log("txSignHex==", txSignHex)
    });

    test('create Hd wallet', async () => {
        // const word = "entry wear credit height moment wine assist night despair actual age retreat"
        const generatedMnemonic = "duty asthma steel velvet fold misery source unit canoe verify enjoy cinnamon";
        const seed = bip39.mnemonicToSeedSync(generatedMnemonic);
        console.log("seed==", seed.toString("hex"))
        const { key } = derivePath("m/44'/501'/1'/0'", seed.toString("hex"));
        console.log(getPublicKey(key).toString("hex"))
        const buffer = Buffer.from(getPublicKey(key).toString("hex"), "hex");
        const address = bs58.encode(buffer)
        console.log("address==", address)
    });
})

