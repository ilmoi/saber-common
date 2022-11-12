"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleConnectionBroadcaster = exports.SingleConnectionBroadcaster = exports.DEFAULT_FALLBACK_RETRY_OPTIONS = exports.DEFAULT_RETRY_OPTIONS = void 0;
const error_1 = require("../error");
const provider_1 = require("../provider");
const transaction_1 = require("../transaction");
const utils_1 = require("../utils");
const simulateTransactionWithCommitment_1 = require("../utils/simulateTransactionWithCommitment");
const sendAndSpamRawTx_1 = require("./sendAndSpamRawTx");
__exportStar(require("./tiered"), exports);
/**
 * Default retry parameters.
 */
exports.DEFAULT_RETRY_OPTIONS = {
    retryTimes: 3,
    retryInterval: 1_000,
};
/**
 * Default retry parameters for fallbacks.
 */
exports.DEFAULT_FALLBACK_RETRY_OPTIONS = {
    retryTimes: 10,
    retryInterval: 300,
};
/**
 * Broadcasts transactions to a single connection.
 */
class SingleConnectionBroadcaster {
    sendConnection;
    opts;
    constructor(sendConnection, opts = provider_1.DEFAULT_PROVIDER_OPTIONS) {
        this.sendConnection = sendConnection;
        this.opts = opts;
    }
    /**
     * @inheritdoc
     */
    async getLatestBlockhash(commitment = this.opts.commitment ?? "confirmed") {
        return await this.sendConnection.getLatestBlockhash(commitment);
    }
    /**
     * @inheritdoc
     */
    async getRecentBlockhash(commitment = this.opts.commitment ?? "confirmed") {
        const result = await this.sendConnection.getLatestBlockhash(commitment);
        return result.blockhash;
    }
    /**
     * @inheritdoc
     */
    async broadcast(tx, { printLogs = true, ...opts } = this.opts) {
        if (tx.signatures.length === 0) {
            throw new Error("Transaction must be signed before broadcasting.");
        }
        const rawTx = tx.serialize();
        if (printLogs) {
            return new transaction_1.PendingTransaction(this.sendConnection, await (0, sendAndSpamRawTx_1.sendAndSpamRawTx)(this.sendConnection, rawTx, opts, opts));
        }
        return await (0, utils_1.suppressConsoleErrorAsync)(async () => {
            // hide the logs of TX errors if printLogs = false
            return new transaction_1.PendingTransaction(this.sendConnection, await (0, sendAndSpamRawTx_1.sendAndSpamRawTx)(this.sendConnection, rawTx, opts, opts));
        });
    }
    /**
     * @inheritdoc
     */
    async simulate(tx, { commitment = this.opts.preflightCommitment ?? "confirmed", verifySigners = true, } = {
        commitment: this.opts.preflightCommitment ?? "confirmed",
        verifySigners: true,
    }) {
        if (verifySigners && tx.signatures.length === 0) {
            throw new Error("Transaction must be signed before simulating.");
        }
        return await (0, simulateTransactionWithCommitment_1.simulateTransactionWithCommitment)(this.sendConnection, tx, commitment);
    }
}
exports.SingleConnectionBroadcaster = SingleConnectionBroadcaster;
/**
 * Broadcasts transactions to multiple connections simultaneously.
 */
class MultipleConnectionBroadcaster {
    connections;
    opts;
    constructor(connections, opts = provider_1.DEFAULT_PROVIDER_OPTIONS) {
        this.connections = connections;
        this.opts = opts;
    }
    async getLatestBlockhash(commitment = this.opts.preflightCommitment ?? "confirmed") {
        try {
            const result = await Promise.any(this.connections.map((conn) => conn.getLatestBlockhash(commitment)));
            return result;
        }
        catch (e) {
            if (e instanceof AggregateError) {
                throw (0, error_1.firstAggregateError)(e);
            }
            else {
                throw e;
            }
        }
    }
    async getRecentBlockhash(commitment = this.opts.preflightCommitment ?? "confirmed") {
        try {
            const result = await Promise.any(this.connections.map((conn) => conn.getLatestBlockhash(commitment)));
            return result.blockhash;
        }
        catch (e) {
            if (e instanceof AggregateError) {
                throw (0, error_1.firstAggregateError)(e);
            }
            else {
                throw e;
            }
        }
    }
    async _sendRawTransaction(encoded, options) {
        try {
            return await Promise.any(this.connections.map(async (connection) => {
                return new transaction_1.PendingTransaction(connection, await (0, sendAndSpamRawTx_1.sendAndSpamRawTx)(connection, encoded, options ?? this.opts));
            }));
        }
        catch (e) {
            if (e instanceof AggregateError) {
                throw (0, error_1.firstAggregateError)(e);
            }
            else {
                throw e;
            }
        }
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
    async simulate(tx, { commitment = this.opts.preflightCommitment ??
        this.opts.commitment ??
        "confirmed", verifySigners = true, } = {
        commitment: this.opts.preflightCommitment ?? this.opts.commitment ?? "confirmed",
        verifySigners: true,
    }) {
        if (verifySigners && tx.signatures.length === 0) {
            throw new Error("Transaction must be signed before simulating.");
        }
        try {
            return await Promise.any(this.connections.map(async (connection) => {
                return await (0, simulateTransactionWithCommitment_1.simulateTransactionWithCommitment)(connection, tx, commitment);
            }));
        }
        catch (e) {
            if (e instanceof AggregateError) {
                throw (0, error_1.firstAggregateError)(e);
            }
            else {
                throw e;
            }
        }
    }
}
exports.MultipleConnectionBroadcaster = MultipleConnectionBroadcaster;
//# sourceMappingURL=index.js.map