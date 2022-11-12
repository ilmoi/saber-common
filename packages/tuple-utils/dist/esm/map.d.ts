import type { Maybe } from "@saberhq/option-utils";
import type { Tuple } from "./tuple.js";
/**
 * Applies `mapFn` to the inner value of the tuple.
 */
export declare const tupleMapInner: <T, U, N extends number>(mapFn: (v: T) => U, tuple: Tuple<Maybe<T>, N>) => Tuple<Maybe<U>, N>;
//# sourceMappingURL=map.d.ts.map