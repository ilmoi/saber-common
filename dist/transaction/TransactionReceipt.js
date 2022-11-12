"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionReceipt = exports.confirmTransactionLike = void 0;
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const misc_1 = require("../utils/misc");
const txLink_1 = require("../utils/txLink");
const PendingTransaction_1 = require("./PendingTransaction");
/**
 * Confirms a transaction, returning its receipt.
 *
 * @param tx
 * @returns
 */
const confirmTransactionLike = async (tx) => {
    const ish = await (0, misc_1.valueAsPromise)(tx);
    if (ish instanceof TransactionReceipt) {
        return ish;
    }
    let pending;
    if (ish instanceof PendingTransaction_1.PendingTransaction) {
        pending = ish;
    }
    else {
        pending = await ish.send({
            printLogs: false,
        });
    }
    return await pending.wait();
};
exports.confirmTransactionLike = confirmTransactionLike;
/**
 * A transaction that has been processed by the cluster.
 */
class TransactionReceipt {
    signature;
    response;
    constructor(
    /**
     * Signature (id) of the transaction.
     */
    signature, 
    /**
     * Raw response from web3.js
     */
    response) {
        this.signature = signature;
        this.response = response;
    }
    /**
     * Gets the events associated with this transaction.
     */
    getEvents(eventParser) {
        const logs = this.response.meta?.logMessages;
        if (logs && logs.length > 0) {
            return eventParser(logs);
        }
        return [];
    }
    /**
     * Prints the logs associated with this transaction.
     */
    printLogs() {
        console.log(this.response.meta?.logMessages?.join("\n"));
    }
    /**
     * Gets the compute units used by the transaction.
     * @returns
     */
    get computeUnits() {
        const logs = this.response.meta?.logMessages;
        (0, tiny_invariant_1.default)(logs, "no logs");
        const consumeLog = logs[logs.length - 2];
        (0, tiny_invariant_1.default)(consumeLog, "no consume log");
        const amtStr = consumeLog.split(" ")[3];
        (0, tiny_invariant_1.default)(amtStr, "no amount");
        return parseInt(amtStr);
    }
    /**
     * Generates a link to view this {@link TransactionReceipt} on the official Solana explorer.
     * @param network
     * @returns
     */
    generateSolanaExplorerLink(cluster = "mainnet-beta") {
        return (0, txLink_1.generateTXLink)(this.signature, cluster);
    }
}
exports.TransactionReceipt = TransactionReceipt;
//# sourceMappingURL=TransactionReceipt.js.map