import { PublicKey } from "@saberhq/solana-contrib";
/**
 * Wallet adapter wrapper with caching of the PublicKey built-in.
 */
export class WrappedWalletAdapter {
    constructor(adapter) {
        this.adapter = adapter;
        this._prevPubkey = null;
        this._publicKeyCached = null;
    }
    get publicKey() {
        if (!this.connected) {
            return null;
        }
        if (this.adapter.publicKey) {
            if (this.adapter.publicKey === this._prevPubkey) {
                if (this._publicKeyCached) {
                    return this._publicKeyCached;
                }
            }
            this._prevPubkey = this.adapter.publicKey;
            this._publicKeyCached = new PublicKey(this.adapter.publicKey.toString());
            return this._publicKeyCached;
        }
        throw new Error("Invalid wallet connection state");
    }
    get autoApprove() {
        return this.adapter.autoApprove;
    }
    get connected() {
        return (this.adapter.connected &&
            // need this branch b/c Solflare adapter does not respect the connected state properly
            !!this.adapter.publicKey);
    }
    signAndBroadcastTransaction(transaction, connection, broadcaster, opts) {
        return this.adapter.signAndBroadcastTransaction(transaction, connection, broadcaster, opts);
    }
    signTransaction(transaction) {
        return this.adapter.signTransaction(transaction);
    }
    signAllTransactions(transaction) {
        return this.adapter.signAllTransactions(transaction);
    }
    connect(args) {
        return this.adapter.connect(args);
    }
    async disconnect() {
        await this.adapter.disconnect();
        this._prevPubkey = null;
        this._publicKeyCached = null;
    }
    on(event, fn) {
        this.adapter.on(event, fn);
    }
}
//# sourceMappingURL=types.js.map