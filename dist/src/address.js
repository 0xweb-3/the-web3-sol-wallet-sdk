"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateKeyToAddress = exports.pubKeyToAddress = exports.createNormalWalet = exports.createHdWallet = void 0;
const web3_js_1 = require("@solana/web3.js");
const bs58 = require("bs58");
const bip39 = require("bip39");
const { derivePath, getPublicKey } = require('ed25519-hd-key');
function createHdWallet() {
    const generatedMnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(generatedMnemonic);
    const { key } = derivePath("m/44'/501'/1'/0'", seed.toString("hex"));
    const publicKey = getPublicKey(key,  false).toString("hex");
    const buffer = Buffer.from(getPublicKey(key, false).toString("hex"), "hex");
    const address = bs58.encode(buffer);
    const hdWallet = {
        "mnemonic": generatedMnemonic,
        "publicKey": publicKey,
        "address": address,
    };
    return JSON.stringify(hdWallet);
}
exports.createHdWallet = createHdWallet;
function createNormalWalet() {
    const keypairs = web3_js_1.Keypair.generate();
    const secretKey = keypairs.secretKey;
    let secretKeyHex = Buffer.from(secretKey).toString('hex');
    const normalWallet = {
        "privateKey": secretKeyHex,
        "publicKey": keypairs.publicKey.toString(),
        "address": bs58.encode(keypairs.publicKey),
    };
    return JSON.stringify(normalWallet);
}
exports.createNormalWalet = createNormalWalet;
function pubKeyToAddress({ pubKey }) {
    if (pubKey.length !== 64) {
        throw new Error("public key length Invalid");
    }
    const buffer = Buffer.from(pubKey, "hex");
    return bs58.encode(buffer);
}
exports.pubKeyToAddress = pubKeyToAddress;
function privateKeyToAddress({ privateKey }) {
    const bufferPriv = Buffer.from(privateKey, "hex");
    const keypairs = web3_js_1.Keypair.fromSecretKey(bufferPriv);
    return bs58.encode(keypairs.publicKey);
}
exports.privateKeyToAddress = privateKeyToAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hZGRyZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUF3QztBQUV4QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDNUIsTUFBTSxLQUFLLEdBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLE1BQU0sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7QUFHOUQsU0FBZ0IsY0FBYztJQUMxQixNQUFNLGlCQUFpQixHQUFHLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxDQUFBO0lBQ2xELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3JFLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbkMsTUFBTSxRQUFRLEdBQUc7UUFDYixVQUFVLEVBQUUsaUJBQWlCO1FBQzdCLFdBQVcsRUFBRSxTQUFTO1FBQ3RCLFNBQVMsRUFBRSxPQUFPO0tBQ3JCLENBQUE7SUFDRCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDbkMsQ0FBQztBQWJELHdDQWFDO0FBR0QsU0FBZ0IsaUJBQWlCO0lBQzdCLE1BQU0sUUFBUSxHQUFHLGlCQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQTtJQUNwQyxJQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxRCxNQUFNLFlBQVksR0FBRztRQUNqQixZQUFZLEVBQUUsWUFBWTtRQUMxQixXQUFXLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7UUFDMUMsU0FBUyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztLQUM3QyxDQUFBO0lBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFBO0FBQ3ZDLENBQUM7QUFWRCw4Q0FVQztBQUdELFNBQWdCLGVBQWUsQ0FBQyxFQUFDLE1BQU0sRUFBQztJQUNwQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFO1FBQ3RCLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztLQUNoRDtJQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFDLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQixDQUFDO0FBTkQsMENBTUM7QUFFRCxTQUFnQixtQkFBbUIsQ0FBQyxFQUFDLFVBQVUsRUFBQztJQUM1QyxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsRCxNQUFNLFFBQVEsR0FBRyxpQkFBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFKRCxrREFJQyJ9