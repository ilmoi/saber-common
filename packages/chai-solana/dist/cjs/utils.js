"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertError = exports.expectTX = void 0;
require("chai-as-promised");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const chai_1 = require("chai");
/**
 * Processes a transaction, expecting rejection or fulfillment.
 *
 * @param tx
 * @param msg
 * @param cb
 * @returns
 */
const expectTX = (tx, msg, cb) => {
    const handleReceipt = async (receipt) => {
        await (cb === null || cb === void 0 ? void 0 : cb(receipt));
        return receipt;
    };
    if (tx && "then" in tx) {
        return (0, chai_1.expect)(tx
            .then(async (v) => {
            if (v === null) {
                throw new Error("transaction is null");
            }
            return await (0, solana_contrib_1.confirmTransactionLike)(v);
        })
            .then(handleReceipt), msg).eventually;
    }
    else if (tx) {
        return (0, chai_1.expect)((0, solana_contrib_1.confirmTransactionLike)(tx).then(handleReceipt), msg)
            .eventually;
    }
    else {
        return (0, chai_1.expect)(Promise.reject(new Error("transaction is null")), msg)
            .eventually;
    }
};
exports.expectTX = expectTX;
const assertError = (error, other) => {
    chai_1.assert.strictEqual(error.code, other.code);
    chai_1.assert.strictEqual(error.msg, other.msg);
};
exports.assertError = assertError;
//# sourceMappingURL=utils.js.map