"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertTXThrowsCode = exports.assertTXThrows = exports.assertTXSuccess = exports.expectTXTable = void 0;
const anchor_contrib_1 = require("@saberhq/anchor-contrib");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const printInstructionLogs_js_1 = require("./printInstructionLogs.js");
const utils_js_1 = require("./utils.js");
/**
 * expectTXTable is a drop in replacement for expectTX with a cool table output like:
 * ```
 *    872 example message (tests/awesomeTest.spec.ts:583:29)
 *    ┌─────┬───┬───┬───┬───────────┬──────┬─────┬──────┬───┐
 *    │index│iso│mar│cum│ programId │quota │used │ left │CPI│
 *    ├─────┼───┼───┼───┼───────────┼──────┼─────┼──────┼───┤
 *    │  0  │298│281│464│'ATokenG..'│200000│24270│175730│ 1 │
 *    │  1  │298│ 74│538│'ATokenG..'│178730│21270│157460│ 1 │
 *    │  2  │298│ 74│612│'ATokenG..'│157460│27277│130183│ 1 │
 *    │  3  │298│ 42│686│'ATokenG..'│130183│21270│108913│ 1 │
 *    │  4  │338│265│951│'qExampL..'│108913│76289│ 32624│ 3 │
 *    └─────┴───┴───┴───┴───────────┴──────┴─────┴──────┴───┘
 * ```
 *
 * - **index**: the array index of the instruction within the transaction
 * - **iso**: the isolated size of the instruction (marginal cost of only the instruction)
 * - **mar**: the marginal size cost of the instruction (when added to previous)
 * - **cum**: the cumulative size of the instructions up until that instruction
 * - **quota/used/left**: [BPF instruction compute unit info](https://docs.solana.com/developing/programming-model/runtime)
 * - **CPI**: [the maximum depth of CPI](https://docs.solana.com/developing/programming-model/calling-between-programs) (current limit in Solana is 4)
 *
 * @param verbosity If "printLogs", will always print the logs of the simulation.
 * It's a string and not a boolean so you can easily search and comment it out if needed
 */
const expectTXTable = (tx, msg, { verbosity = null, formatLogs = true, } = {
    verbosity: null,
    formatLogs: true,
}) => {
    var _a;
    if (tx === null) {
        throw new Error();
    }
    let relativePath;
    const callStack = (_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split("\n");
    if (callStack) {
        const expectIndex = callStack.findIndex((l) => l.includes(`at ${exports.expectTXTable.name}`));
        if (expectIndex > 0) {
            const targetLine = callStack[expectIndex + 1];
            if (targetLine) {
                const cwd = process.cwd();
                // get the part of targetLine after cwd
                const targetLineAfterCwd = targetLine.substring(targetLine.indexOf(cwd) + cwd.length);
                if (targetLineAfterCwd.length > 0) {
                    relativePath = targetLineAfterCwd.substring(1);
                }
            }
        }
    }
    // Run the simulation before sending the tx to avoid a race condition.
    void tx
        .simulate()
        .then((simulation) => {
        var _a;
        if ((_a = simulation === null || simulation === void 0 ? void 0 : simulation.value) === null || _a === void 0 ? void 0 : _a.logs) {
            (0, solana_contrib_1.printTXTable)(tx, simulation.value.logs, `${msg ? msg + " " : ""}${relativePath ? `(${relativePath})` : ""}`);
        }
        const logs = simulation.value.logs;
        if (logs) {
            if (verbosity === "always" ||
                (verbosity === "error" && simulation.value.err)) {
                if (formatLogs) {
                    const parsed = (0, solana_contrib_1.parseTransactionLogs)(logs, simulation.value.err);
                    const fmt = (0, printInstructionLogs_js_1.formatInstructionLogsForConsole)(parsed);
                    console.log(fmt);
                }
                else {
                    console.log(logs.join("\n"));
                }
            }
            if (simulation.value.err) {
                let lastLine = "";
                for (let i = 0; i < logs.length; i++) {
                    const curLine = logs[i];
                    if (curLine) {
                        const errorCode = curLine.match(/Program log: Custom program error: (0x[0-9a-f]*)/);
                        if (errorCode && errorCode[1]) {
                            const programIdMatch = lastLine.split(" ");
                            if (programIdMatch && programIdMatch[1]) {
                                console.log(`    Program ${programIdMatch[1]} error:`, Number(errorCode[1]));
                            }
                        }
                        lastLine = curLine;
                    }
                }
                console.log("   ", JSON.stringify(simulation.value.err));
            }
        }
    })
        .catch((e) => {
        if (e instanceof Error) {
            console.log(e.message);
        }
    });
    return (0, utils_js_1.expectTX)(tx, (msg !== null && msg !== void 0 ? msg : "") + (relativePath ? ` (${relativePath})` : ""));
};
exports.expectTXTable = expectTXTable;
/**
 * Assert that a transaction is successful.
 * @param tx
 * @param msg
 * @returns
 */
const assertTXSuccess = (tx, msg) => {
    return (0, utils_js_1.expectTX)(tx, msg).to.be.fulfilled;
};
exports.assertTXSuccess = assertTXSuccess;
/**
 * Assert that a transaction will throw the given error.
 * @param tx
 * @param msg
 * @returns
 */
const assertTXThrows = (tx, err, msg) => {
    return (0, utils_js_1.expectTX)(tx, msg).to.be.rejectedWith((0, anchor_contrib_1.matchError)(err));
};
exports.assertTXThrows = assertTXThrows;
/**
 * Assert that a transaction will throw the given error.
 * @param tx
 * @param msg
 * @returns
 */
const assertTXThrowsCode = (tx, code, msg) => {
    return (0, utils_js_1.expectTX)(tx, msg).to.be.rejectedWith((0, anchor_contrib_1.matchErrorCode)(code));
};
exports.assertTXThrowsCode = assertTXThrowsCode;
//# sourceMappingURL=expectTXTable.js.map