"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateTransactionWithCommitment = void 0;
const web3_js_1 = require("@solana/web3.js");
/**
 * Copy of Connection.simulateTransaction that takes a commitment parameter.
 */
async function simulateTransactionWithCommitment(connection, transaction, commitment = "confirmed") {
    const connectionInner = connection;
    // only populate recent blockhash if it isn't on the tx
    if (!transaction.recentBlockhash) {
        const { blockhash } = await connection.getLatestBlockhash(commitment);
        transaction.recentBlockhash = blockhash;
    }
    const wireTransaction = transaction.serialize({
        requireAllSignatures: false,
    });
    const encodedTransaction = wireTransaction.toString("base64");
    const config = { encoding: "base64", commitment };
    const res = await connectionInner._rpcRequest("simulateTransaction", [
        encodedTransaction,
        config,
    ]);
    if (res.error) {
        throw new web3_js_1.SendTransactionError("failed to simulate transaction: " + res.error.message, res.result.value.logs ?? undefined);
    }
    return res.result;
}
exports.simulateTransactionWithCommitment = simulateTransactionWithCommitment;
//# sourceMappingURL=simulateTransactionWithCommitment.js.map