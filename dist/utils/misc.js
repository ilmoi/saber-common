"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPubkeyShort = exports.valueAsPromise = exports.sleep = exports.suppressConsoleError = exports.suppressConsoleErrorAsync = void 0;
__exportStar(require("@saberhq/option-utils/dist/cjs"), exports);
const noop = () => {
    // noop
};
/**
 * Hide the console.error because @solana/web3.js often emits noisy errors as a
 * side effect.
 */
const suppressConsoleErrorAsync = async (fn) => {
    const oldConsoleError = console.error;
    console.error = noop;
    try {
        const result = await fn();
        console.error = oldConsoleError;
        return result;
    }
    catch (e) {
        console.error = oldConsoleError;
        throw e;
    }
};
exports.suppressConsoleErrorAsync = suppressConsoleErrorAsync;
/**
 * Hide the console.error because @solana/web3.js often emits noisy errors as a
 * side effect.
 */
const suppressConsoleError = (fn) => {
    const oldConsoleError = console.error;
    console.error = noop;
    try {
        const result = fn();
        console.error = oldConsoleError;
        return result;
    }
    catch (e) {
        console.error = oldConsoleError;
        throw e;
    }
};
exports.suppressConsoleError = suppressConsoleError;
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
exports.sleep = sleep;
/**
 * Awaits for a promise or value.
 */
const valueAsPromise = async (awaitable) => {
    if ("then" in awaitable) {
        return await awaitable;
    }
    return awaitable;
};
exports.valueAsPromise = valueAsPromise;
/**
 * Shortens a pubkey.
 * @param pubkey
 * @returns
 */
const formatPubkeyShort = (pubkey, leading = 7, trailing = 7) => {
    const str = pubkey.toString();
    return str.length > 20
        ? `${str.substring(0, leading)}.....${str.substring(str.length - trailing, str.length)}`
        : str;
};
exports.formatPubkeyShort = formatPubkeyShort;
//# sourceMappingURL=misc.js.map