import type { IdlErrorCode } from "@project-serum/anchor/dist/esm/idl.js";
import type { TransactionEnvelope } from "@saberhq/solana-contrib";
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
export declare const expectTXTable: (tx: TransactionEnvelope, msg?: string, { verbosity, formatLogs, }?: {
    /**
     * Logging verbosity.
     *
     * - `always` -- print logs whenever they exist
     * - `error` -- print logs only if there is an error
     * - `null` -- never print the full transaction logs
     */
    verbosity?: "always" | "error" | null | undefined;
    formatLogs?: boolean | undefined;
}) => Chai.PromisedAssertion;
/**
 * Assert that a transaction is successful.
 * @param tx
 * @param msg
 * @returns
 */
export declare const assertTXSuccess: (tx: TransactionEnvelope, msg?: string) => Chai.PromisedAssertion;
/**
 * Assert that a transaction will throw the given error.
 * @param tx
 * @param msg
 * @returns
 */
export declare const assertTXThrows: (tx: TransactionEnvelope, err: IdlErrorCode, msg?: string) => Chai.PromisedAssertion;
/**
 * Assert that a transaction will throw the given error.
 * @param tx
 * @param msg
 * @returns
 */
export declare const assertTXThrowsCode: (tx: TransactionEnvelope, code: number, msg?: string) => Chai.PromisedAssertion;
//# sourceMappingURL=expectTXTable.d.ts.map