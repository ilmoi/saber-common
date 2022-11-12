"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendAndSpamRawTx = void 0;
const utils_1 = require("../utils");
const index_1 = require("./index");
/**
 * Sends and spams a raw transaction multiple times.
 * @param connection Connection to send the transaction to. We recommend using a public endpoint such as GenesysGo.
 * @param rawTx
 * @param opts
 */
const sendAndSpamRawTx = async (connection, rawTx, sendOptions, { retryTimes = index_1.DEFAULT_RETRY_OPTIONS.retryTimes, retryInterval = index_1.DEFAULT_RETRY_OPTIONS.retryInterval, } = index_1.DEFAULT_RETRY_OPTIONS) => {
    const result = await connection.sendRawTransaction(rawTx, sendOptions);
    // if we could send the TX with preflight, let's spam it.
    void (async () => {
        // technique stolen from Mango.
        for (let i = 0; i < retryTimes; i++) {
            try {
                await (0, utils_1.sleep)(retryInterval);
                await connection.sendRawTransaction(rawTx, {
                    ...sendOptions,
                    skipPreflight: true,
                });
            }
            catch (e) {
                console.warn(`[Broadcaster] sendAndSpamRawTx error`, e);
            }
        }
    })();
    return result;
};
exports.sendAndSpamRawTx = sendAndSpamRawTx;
//# sourceMappingURL=sendAndSpamRawTx.js.map