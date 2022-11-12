import { PublicKey } from "@solana/web3.js";
import { EventEmitter } from "eventemitter3";
/**
 * Sets the readonly Solana pubkey.
 * @param pubkey
 */
export const setReadonlySolanaPubkey = (pubkey) => {
    window.USE_SOLANA_PUBKEY_OVERRIDE = pubkey.toString();
};
/**
 * Adapter that cannot sign transactions. Dummy for testing.
 */
export class ReadonlyAdapter extends EventEmitter {
    constructor() {
        var _a, _b;
        super();
        this._publicKey = null;
        this.connect = () => {
            this.emit("connect", this._publicKey);
            return Promise.resolve();
        };
        const localPubkey = (_b = (_a = window.USE_SOLANA_PUBKEY_OVERRIDE) !== null && _a !== void 0 ? _a : process.env.REACT_APP_LOCAL_PUBKEY) !== null && _b !== void 0 ? _b : process.env.LOCAL_PUBKEY;
        if (!localPubkey) {
            console.warn("LOCAL_PUBKEY not set for readonly provider");
        }
        else {
            this._publicKey = new PublicKey(localPubkey);
        }
    }
    get connected() {
        return true;
    }
    get autoApprove() {
        return false;
    }
    get publicKey() {
        return this._publicKey;
    }
    signAndBroadcastTransaction(_transaction, _connection, _broadcaster, _opts) {
        throw new Error("readonly adapter cannot sign transactions");
    }
    signAllTransactions(_transactions) {
        throw new Error("readonly adapter cannot sign transactions");
    }
    signTransaction(_transaction) {
        throw new Error("readonly adapter cannot sign transactions");
    }
    disconnect() {
        this.emit("disconnect");
    }
}
//# sourceMappingURL=index.js.map