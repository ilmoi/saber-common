import { formatLogEntry, parseTransactionLogs } from "@saberhq/solana-contrib";
import { default as colors } from "colors/safe.js";
/**
 * Formats instruction logs to be printed to the console.
 * @param logs
 */
export const formatInstructionLogsForConsole = (logs) => logs
    .map((log, i) => {
    return [
        [
            colors.bold(colors.blue("=> ")),
            colors.bold(colors.white(`Instruction #${i}: `)),
            log.programAddress
                ? colors.yellow(`Program ${log.programAddress}`)
                : "System",
        ].join(""),
        ...log.logs.map((entry) => {
            const entryStr = formatLogEntry(entry, true);
            switch (entry.type) {
                case "text":
                    return colors.white(entryStr);
                case "cpi":
                    return colors.cyan(entryStr);
                case "programError":
                    return colors.red(entryStr);
                case "runtimeError":
                    return colors.red(entryStr);
                case "system":
                    return colors.white(entryStr);
                case "success":
                    return colors.green(entryStr);
            }
        }),
    ].join("\n");
})
    .join("\n");
export const printSendTransactionError = (err) => {
    var _a, _b;
    try {
        const parsed = parseTransactionLogs((_a = err.logs) !== null && _a !== void 0 ? _a : null, err);
        console.log(formatInstructionLogsForConsole(parsed));
    }
    catch (e) {
        console.warn(colors.yellow("Could not print logs due to error. Printing raw logs"), e);
        console.log((_b = err.logs) === null || _b === void 0 ? void 0 : _b.join("\n"));
    }
};
//# sourceMappingURL=printInstructionLogs.js.map