import "chai-as-promised";
import { confirmTransactionLike } from "@saberhq/solana-contrib";
import { assert, expect } from "chai";
/**
 * Processes a transaction, expecting rejection or fulfillment.
 *
 * @param tx
 * @param msg
 * @param cb
 * @returns
 */
export const expectTX = (tx, msg, cb) => {
    const handleReceipt = async (receipt) => {
        await (cb === null || cb === void 0 ? void 0 : cb(receipt));
        return receipt;
    };
    if (tx && "then" in tx) {
        return expect(tx
            .then(async (v) => {
            if (v === null) {
                throw new Error("transaction is null");
            }
            return await confirmTransactionLike(v);
        })
            .then(handleReceipt), msg).eventually;
    }
    else if (tx) {
        return expect(confirmTransactionLike(tx).then(handleReceipt), msg)
            .eventually;
    }
    else {
        return expect(Promise.reject(new Error("transaction is null")), msg)
            .eventually;
    }
};
export const assertError = (error, other) => {
    assert.strictEqual(error.code, other.code);
    assert.strictEqual(error.msg, other.msg);
};
//# sourceMappingURL=utils.js.map