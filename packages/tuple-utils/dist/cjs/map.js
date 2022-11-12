"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tupleMapInner = void 0;
const option_utils_1 = require("@saberhq/option-utils");
/**
 * Applies `mapFn` to the inner value of the tuple.
 */
const tupleMapInner = (mapFn, tuple) => {
    return tuple.map((v) => (0, option_utils_1.mapN)(mapFn, v));
};
exports.tupleMapInner = tupleMapInner;
//# sourceMappingURL=map.js.map