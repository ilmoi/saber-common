import { mapN } from "@saberhq/option-utils";
/**
 * Applies `mapFn` to the inner value of the tuple.
 */
export const tupleMapInner = (mapFn, tuple) => {
    return tuple.map((v) => mapN(mapFn, v));
};
//# sourceMappingURL=map.js.map