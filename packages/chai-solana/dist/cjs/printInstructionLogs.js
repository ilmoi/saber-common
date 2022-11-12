"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printSendTransactionError = exports.formatInstructionLogsForConsole = void 0;
const tslib_1 = require("tslib");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const safe_js_1 = tslib_1.__importDefault(require("colors/safe.js"));
/**
 * Formats instruction logs to be printed to the console.
 * @param logs
 */
const formatInstructionLogsForConsole = (logs) => logs
    .map((log, i) => {
    return [
        [
            safe_js_1.default.bold(safe_js_1.default.blue("=> ")),
            safe_js_1.default.bold(safe_js_1.default.white(`Instruction #${i}: `)),
            log.programAddress
                ? safe_js_1.default.yellow(`Program ${log.programAddress}`)
                : "System",
        ].join(""),
        ...log.logs.map((entry) => {
            const entryStr = (0, solana_contrib_1.formatLogEntry)(entry, true);
            switch (entry.type) {
                case "text":
                    return safe_js_1.default.white(entryStr);
                case "cpi":
                    return safe_js_1.default.cyan(entryStr);
                case "programError":
                    return safe_js_1.default.red(entryStr);
                case "runtimeError":
                    return safe_js_1.default.red(entryStr);
                case "system":
                    return safe_js_1.default.white(entryStr);
                case "success":
                    return safe_js_1.default.green(entryStr);
            }
        }),
    ].join("\n");
})
    .join("\n");
exports.formatInstructionLogsForConsole = formatInstructionLogsForConsole;
const printSendTransactionError = (err) => {
    var _a, _b;
    try {
        const parsed = (0, solana_contrib_1.parseTransactionLogs)((_a = err.logs) !== null && _a !== void 0 ? _a : null, err);
        console.log((0, exports.formatInstructionLogsForConsole)(parsed));
    }
    catch (e) {
        console.warn(safe_js_1.default.yellow("Could not print logs due to error. Printing raw logs"), e);
        console.log((_b = err.logs) === null || _b === void 0 ? void 0 : _b.join("\n"));
    }
};
exports.printSendTransactionError = printSendTransactionError;
//# sourceMappingURL=printInstructionLogs.js.map