"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PendingTransaction = void 0;
const promise_retry_1 = __importDefault(require("promise-retry"));
const txLink_1 = require("../utils/txLink");
const TransactionReceipt_1 = require("./TransactionReceipt");
/**
 * Transaction which may or may not be confirmed.
 */
class PendingTransaction {
    connection;
    signature;
    _receipt = null;
    constructor(connection, signature) {
        this.connection = connection;
        this.signature = signature;
    }
    /**
     * Gets the transaction receipt, if it has already been fetched.
     *
     * You probably want the async version of this function, `wait`.
     */
    get receipt() {
        return this._receipt;
    }
    /**
     * Waits for the confirmation of the transaction.
     * @returns
     */
    async wait({ commitment = "confirmed", maxSupportedTransactionVersion = 0, useWebsocket = true, ...retryOpts } = {}) {
        if (this._receipt) {
            return this._receipt;
        }
        if (useWebsocket) {
            await this.confirm({ commitment, ...retryOpts });
            return await this.pollForReceipt({
                commitment,
                maxSupportedTransactionVersion,
            });
        }
        return await this.pollForReceipt({
            commitment,
            maxSupportedTransactionVersion,
            ...retryOpts,
        });
    }
    /**
     * Fetches the TransactionReceipt via polling.
     * @returns
     */
    async pollForReceipt({ commitment = "confirmed", maxSupportedTransactionVersion = 0, ...retryOpts } = {}) {
        const receipt = await (0, promise_retry_1.default)(async (retry) => {
            const result = await this.connection.getTransaction(this.signature, {
                commitment,
                maxSupportedTransactionVersion,
            });
            if (!result) {
                retry(new Error("Error fetching transaction"));
                return;
            }
            return new TransactionReceipt_1.TransactionReceipt(this.signature, result);
        }, {
            retries: 5,
            minTimeout: 500,
            ...retryOpts,
        });
        if (!receipt) {
            throw new Error("transaction could not be confirmed");
        }
        this._receipt = receipt;
        return receipt;
    }
    /**
     * Awaits the confirmation of the transaction, via onSignature subscription.
     *
     * @deprecated use {@link PendingTransaction#confirm}
     * @returns
     */
    async awaitSignatureConfirmation(commitment = "confirmed") {
        const { value } = await this.connection.confirmTransaction(this.signature, commitment);
        if (value.err) {
            throw value.err;
        }
        return this.signature;
    }
    /**
     * Awaits the confirmation of the transaction, via onSignature subscription.
     * @returns
     */
    async confirm({ commitment = "confirmed", blockhash, lastValidBlockHeight, }) {
        let value;
        if (blockhash && lastValidBlockHeight) {
            value = (await this.connection.confirmTransaction({
                signature: this.signature,
                blockhash,
                lastValidBlockHeight,
            }, commitment)).value;
        }
        else {
            value = (await this.connection.confirmTransaction(this.signature, commitment)).value;
        }
        if (value.err) {
            throw new Error(`Transaction ${this.signature} failed (${JSON.stringify(value)})`);
        }
        return this.signature;
    }
    /**
     * Generates a link to view this {@link PendingTransaction} on the official Solana explorer.
     * @param network
     * @returns
     */
    generateSolanaExplorerLink(cluster = "mainnet-beta") {
        return (0, txLink_1.generateTXLink)(this.signature, cluster);
    }
}
exports.PendingTransaction = PendingTransaction;
//# sourceMappingURL=PendingTransaction.js.map