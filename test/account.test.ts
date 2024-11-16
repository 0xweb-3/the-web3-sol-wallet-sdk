import { createNormalWalet } from "../src/address"
import { Connection, NonceAccount, PublicKey, clusterApiUrl } from "@solana/web3.js"
const bs58 = require("bs58")
const bip39 =  require("bip39")
const { derivePath, getPublicKey } = require('ed25519-hd-key')


describe('account prepare', ()=>{
    test('create author account',  async()=> {
        let authorAddr = createNormalWalet()
        console.log("authorAddr===", authorAddr)
    });

    test('create Hd wallet', async () => {
        // const word = "entry wear credit height moment wine assist night despair actual age retreat"
        const generatedMnemonic = "face defy torch paper dial goddess floor wage nephew floor million belt";
        const seed = bip39.mnemonicToSeedSync(generatedMnemonic);
        console.log("seed==", seed.toString("hex"))
        const { key } = derivePath("m/44'/501'/0'/0'", seed.toString("hex"));
        console.log("key==", key.toString("hex"))
        console.log("PublicKey=",getPublicKey(key, false).toString("hex"))
        const buffer = Buffer.from(getPublicKey(key, false).toString("hex"), "hex");
        const address = bs58.encode(buffer)
        console.log("address==", address)
    });

    test('nonceAccount', async ()=>{
        let connection = new Connection(clusterApiUrl("mainnet-beta"));
        const nonceAcctInfo = await connection.getAccountInfo(new PublicKey("FaP4Ti84eCuGibYNeGMTKCZW9YyyZHgoSB6nFViGtBdy"));
        const nonceAccount = NonceAccount.fromAccountData(nonceAcctInfo.data);
        let nonce = nonceAccount.nonce;
        console.log("nonce===", nonce)
    });
})

/*
authorAddress
privateKey: f464f9d6f87e3feece82bcf7509a99adbf9c3f38c8fb30c77ae6a92360a45f656488e3d824c6eb210b97f7f5c49d2e5f0ff63b289f2b2f861af31fa09421163d
publicKey: 6488e3d824c6eb210b97f7f5c49d2e5f0ff63b289f2b2f861af31fa09421163d
address: 7mSqVJpb8ziMDB7yDAEajeANyDosh1WK5ksS6mCdDHRE

nonceAddress
privateKey: 6643b949889be7bce4727e7231a6a36c66df224a1344e67c79487976a05b750cd890ba031933d8ef8a7259adee3a7b40b2a5702d2439e804b06a012e9ccfdd50
publicKey: d890ba031933d8ef8a7259adee3a7b40b2a5702d2439e804b06a012e9ccfdd50
address: FaP4Ti84eCuGibYNeGMTKCZW9YyyZHgoSB6nFViGtBdy
 */
//8314ddb3980a9c59eb1fdd8da075cfb3e9337bb9207682156e8673f153767fc77cc52f2ed407e90a828746221afa7b9f7285a2ac1bfd500240232e0837873f55

// 6643b949889be7bce4727e7231a6a36c66df224a1344e67c79487976a05b750cd890ba031933d8ef8a7259adee3a7b40b2a5702d2439e804b06a012e9ccfdd50
// 147908be03cee4057ba306da2ea1c3afd26a79f6da5390ab41ebddcda350c7a200bf8047b999003ac1a26acc858d5ee4da64621099a558919e4e330c01ca291da7

// f57bf141d48aed7a55b7dafef0712a6245d0955eca9d5ffac25ab2c4a6a670c53f6ca858ad9b49191d36dc95ad49b814452899a167b6ba78693a55a027f0eb89
//