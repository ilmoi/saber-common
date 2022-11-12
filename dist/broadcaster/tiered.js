"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TieredBroadcaster = void 0;
const provider_1 = require("../provider");
const transaction_1 = require("../transaction");
const utils_1 = require("../utils");
const index_1 = require("./index");
const sendAndSpamRawTx_1 = require("./sendAndSpamRawTx");
/**
 * Broadcasts transactions to multiple connections simultaneously.
 */
class TieredBroadcaster {
    primaryConnection;
    fallbackConnections;
    opts;
    premiumBroadcaster;
    constructor(primaryConnection, 
    /**
     * Connections to send to in addition to the primary.
     */
    fallbackConnections, opts = provider_1.DEFAULT_PROVIDER_OPTIONS) {
        this.primaryConnection = primaryConnection;
        this.fallbackConnections = fallbackConnections;
        this.opts = opts;
        this.premiumBroadcaster = new index_1.SingleConnectionBroadcaster(primaryConnection, opts);
    }
    async getLatestBlockhash(commitment = this.opts.preflightCommitment ?? "confirmed") {
        return await this.premiumBroadcaster.getLatestBlockhash(commitment);
    }
    async getRecentBlockhash(commitment = this.opts.preflightCommitment ?? "confirmed") {
        return await this.premiumBroadcaster.getRecentBlockhash(commitment);
    }
    async _sendRawTransaction(encoded, options) {
        const pending = new transaction_1.PendingTransaction(this.primaryConnection, await (0, sendAndSpamRawTx_1.sendAndSpamRawTx)(this.primaryConnection, encoded, options ?? this.opts, options ?? index_1.DEFAULT_RETRY_OPTIONS));
        void (async () => {
            await Promise.all(this.fallbackConnections.map(async (fc) => {
                try {
                    await (0, sendAndSpamRawTx_1.sendAndSpamRawTx)(fc, encoded, options ?? this.opts, options?.fallbackRetryOptions ?? index_1.DEFAULT_FALLBACK_RETRY_OPTIONS);
                }
                catch (e) {
                    console.warn(`[Broadcaster] _sendRawTransaction error`, e);
                }
            }));
        })();
        return pending;
    }
    /**
     * Broadcasts a signed transaction.
     *
     * @param tx
     * @param confirm
     * @param opts
     * @returns
     */
    async broadcast(tx, { printLogs = true, ...opts } = this.opts) {
        if (tx.signatures.length === 0) {
            throw new Error("Transaction must be signed before broadcasting.");
        }
        const rawTx = tx.serialize();
        if (printLogs) {
            return await this._sendRawTransaction(rawTx, opts);
        }
        return await (0, utils_1.suppressConsoleErrorAsync)(async () => {
            // hide the logs of TX errors if printLogs = false
            return await this._sendRawTransaction(rawTx, opts);
        });
    }
    /**
     * Simulates a transaction with a commitment.
     * @param tx
     * @param commitment
     * @returns
     */
    async simulate(tx, { commitment = this.opts.preflightCommitment ?? "confirmed", verifySigners = true, } = {
        commitment: this.opts.preflightCommitment ?? "confirmed",
        verifySigners: true,
    }) {
        if (verifySigners && tx.signatures.length === 0) {
            throw new Error("Transaction must be signed before simulating.");
        }
        return this.premiumBroadcaster.simulate(tx, {
            commitment,
            verifySigners,
        });
    }
}
exports.TieredBroadcaster = TieredBroadcaster;
//# sourceMappingURL=tiered.js.map