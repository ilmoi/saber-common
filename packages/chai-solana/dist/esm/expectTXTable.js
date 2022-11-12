import { matchError, matchErrorCode } from "@saberhq/anchor-contrib";
import { parseTransactionLogs, printTXTable } from "@saberhq/solana-contrib";
import { formatInstructionLogsForConsole } from "./printInstructionLogs.js";
import { expectTX } from "./utils.js";
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
export const expectTXTable = (tx, msg, { verbosity = null, formatLogs = true, } = {
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
        const expectIndex = callStack.findIndex((l) => l.includes(`at ${expectTXTable.name}`));
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
            printTXTable(tx, simulation.value.logs, `${msg ? msg + " " : ""}${relativePath ? `(${relativePath})` : ""}`);
        }
        const logs = simulation.value.logs;
        if (logs) {
            if (verbosity === "always" ||
                (verbosity === "error" && simulation.value.err)) {
                if (formatLogs) {
                    const parsed = parseTransactionLogs(logs, simulation.value.err);
                    const fmt = formatInstructionLogsForConsole(parsed);
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
    return expectTX(tx, (msg !== null && msg !== void 0 ? msg : "") + (relativePath ? ` (${relativePath})` : ""));
};
/**
 * Assert that a transaction is successful.
 * @param tx
 * @param msg
 * @returns
 */
export const assertTXSuccess = (tx, msg) => {
    return expectTX(tx, msg).to.be.fulfilled;
};
/**
 * Assert that a transaction will throw the given error.
 * @param tx
 * @param msg
 * @returns
 */
export const assertTXThrows = (tx, err, msg) => {
    return expectTX(tx, msg).to.be.rejectedWith(matchError(err));
};
/**
 * Assert that a transaction will throw the given error.
 * @param tx
 * @param msg
 * @returns
 */
export const assertTXThrowsCode = (tx, code, msg) => {
    return expectTX(tx, msg).to.be.rejectedWith(matchErrorCode(code));
};
//# sourceMappingURL=expectTXTable.js.map