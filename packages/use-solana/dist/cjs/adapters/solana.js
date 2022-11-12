"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaWalletAdapter = void 0;
const solana_contrib_1 = require("@saberhq/solana-contrib");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const wallet_adapter_glow_1 = require("@solana/wallet-adapter-glow");
const wallet_adapter_phantom_1 = require("@solana/wallet-adapter-phantom");
class SolanaWalletAdapter {
    constructor(adapter) {
        this.adapter = adapter;
        this.connect = async () => {
            await this.adapter.connect();
        };
    }
    async signAndBroadcastTransaction(transaction, connection, broadcaster, opts) {
        var _a, _b;
        if (!transaction.feePayer) {
            transaction.feePayer = (_a = this.publicKey) !== null && _a !== void 0 ? _a : undefined;
        }
        if (this.adapter.name === wallet_adapter_phantom_1.PhantomWalletName) {
            if (((_b = window.solana) === null || _b === void 0 ? void 0 : _b.isPhantom) &&
                // check to see if phantom version supports this
                "signAndSendTransaction" in window.solana &&
                // Phantom doesn't handle partial signers, so if they are provided, don't use `signAndSendTransaction`
                (!(opts === null || opts === void 0 ? void 0 : opts.signers) || opts.signers.length === 0)) {
                // HACK: Phantom's `signAndSendTransaction` should always set these, but doesn't yet
                if (!transaction.recentBlockhash) {
                    const latestBlockhash = await broadcaster.getLatestBlockhash();
                    transaction.recentBlockhash = latestBlockhash.blockhash;
                    transaction.lastValidBlockHeight =
                        latestBlockhash.lastValidBlockHeight;
                }
                const { signature } = await window.solana.signAndSendTransaction(transaction, opts);
                return new solana_contrib_1.PendingTransaction(connection, signature);
            }
        }
        else if (this.adapter.name === wallet_adapter_glow_1.GlowWalletName) {
            if (window.glowSolana && window.glowSolana.signAndSendTransaction) {
                // HACK: Glow's `signAndSendTransaction` should always set these, but doesn't yet
                if (!transaction.recentBlockhash) {
                    const latestBlockhash = await broadcaster.getLatestBlockhash();
                    transaction.recentBlockhash = latestBlockhash.blockhash;
                    transaction.lastValidBlockHeight =
                        latestBlockhash.lastValidBlockHeight;
                }
                const result = await window.glowSolana.signAndSendTransaction({
                    serialize() {
                        return {
                            toString() {
                                return transaction
                                    .serialize({
                                    verifySignatures: false,
                                })
                                    .toString("base64");
                            },
                        };
                    },
                });
                return new solana_contrib_1.PendingTransaction(connection, result.signature);
            }
        }
        else if (this.adapter instanceof wallet_adapter_base_1.BaseSignerWalletAdapter) {
            // attempt to use the wallet's native transaction sending feature
            const signature = await this.adapter.sendTransaction(transaction, connection, opts);
            return new solana_contrib_1.PendingTransaction(connection, signature);
        }
        return await (0, solana_contrib_1.doSignAndBroadcastTransaction)(this, transaction, broadcaster, opts);
    }
    get connected() {
        return this.adapter.connected;
    }
    get autoApprove() {
        return false;
    }
    async signAllTransactions(transactions) {
        return this.adapter.signAllTransactions(transactions);
    }
    get publicKey() {
        return this.adapter.publicKey;
    }
    async signTransaction(transaction) {
        if (!this.adapter) {
            return transaction;
        }
        return this.adapter.signTransaction(transaction);
    }
    async disconnect() {
        await this.adapter.disconnect();
    }
    on(event, fn) {
        this.adapter.on(event, fn);
    }
}
exports.SolanaWalletAdapter = SolanaWalletAdapter;
//# sourceMappingURL=solana.js.map