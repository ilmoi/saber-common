"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tupleFill = void 0;
/**
 * Replaces all of the values of a tuple with the given value.
 */
const tupleFill = (value, tuple) => {
    return tuple.map(() => value);
};
exports.tupleFill = tupleFill;
//# sourceMappingURL=fill.js.map