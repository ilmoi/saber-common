"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPublicKey = exports.parsePublicKey = exports.PublicKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
var web3_js_2 = require("@solana/web3.js");
Object.defineProperty(exports, "PublicKey", { enumerable: true, get: function () { return web3_js_2.PublicKey; } });
/**
 * Returns a {@link PublicKey} if it can be parsed, otherwise returns null.
 * @param pk
 * @returns
 */
const parsePublicKey = (pk) => {
    if (!pk) {
        return null;
    }
    if (pk instanceof web3_js_1.PublicKey) {
        return pk;
    }
    if (typeof pk !== "object" ||
        Array.isArray(pk) ||
        ("constructor" in pk && bn_js_1.default.isBN(pk))) {
        return null;
    }
    try {
        return new web3_js_1.PublicKey(pk);
    }
    catch (e) {
        return null;
    }
};
exports.parsePublicKey = parsePublicKey;
/**
 * Returns true if the given value is a {@link PublicKey}.
 * @param pk
 * @returns
 */
const isPublicKey = (pk) => {
    return !!(0, exports.parsePublicKey)(pk);
};
exports.isPublicKey = isPublicKey;
//# sourceMappingURL=publicKey.js.map