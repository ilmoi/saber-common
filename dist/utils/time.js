"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsToDate = exports.dateToTs = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
/**
 * Converts a {@link Date} to a {@link BN} timestamp.
 * @param date
 * @returns
 */
const dateToTs = (date) => new bn_js_1.default(Math.floor(date.getTime() / 1_000));
exports.dateToTs = dateToTs;
/**
 * Converts a {@link BN} timestamp to a {@link Date}.
 * @param ts
 * @returns
 */
const tsToDate = (ts) => new Date(ts.toNumber() * 1_000);
exports.tsToDate = tsToDate;
//# sourceMappingURL=time.js.map