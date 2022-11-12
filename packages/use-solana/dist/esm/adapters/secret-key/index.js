import { doSignAndBroadcastTransaction, SignerWallet, } from "@saberhq/solana-contrib";
import { Keypair } from "@solana/web3.js";
import EventEmitter from "eventemitter3";
/**
 * Adapter backed by a secret key.
 */
export class SecretKeyAdapter extends EventEmitter {
    constructor() {
        super();
        this.connect = (args) => {
            const argsTyped = args;
            const secretKey = argsTyped === null || argsTyped === void 0 ? void 0 : argsTyped.secretKey;
            if (!secretKey || !Array.isArray(secretKey)) {
                throw new Error("Secret key missing.");
            }
            this._wallet = new SignerWallet(Keypair.fromSecretKey(Uint8Array.from(secretKey)));
            this._publicKey = this._wallet.publicKey;
            this._connected = true;
            this.emit("connect", this.publicKey);
            return Promise.resolve();
        };
        this._connected = false;
    }
    get connected() {
        return this._connected;
    }
    get autoApprove() {
        return false;
    }
    async signAndBroadcastTransaction(transaction, _connection, broadcaster, opts) {
        return await doSignAndBroadcastTransaction(this, transaction, broadcaster, opts);
    }
    signAllTransactions(transactions) {
        const wallet = this._wallet;
        if (!wallet) {
            return Promise.resolve(transactions);
        }
        return wallet.signAllTransactions(transactions);
    }
    get publicKey() {
        var _a;
        return (_a = this._publicKey) !== null && _a !== void 0 ? _a : null;
    }
    async signTransaction(transaction) {
        const wallet = this._wallet;
        if (!wallet) {
            return Promise.resolve(transaction);
        }
        return wallet.signTransaction(transaction);
    }
    disconnect() {
        if (this._wallet) {
            this._wallet = undefined;
            this._publicKey = undefined;
            this._publicKey = undefined;
            this._connected = false;
            this.emit("disconnect");
        }
    }
}
//# sourceMappingURL=index.js.map