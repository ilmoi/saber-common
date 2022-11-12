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
exports.COMPUTE_BUDGET_PROGRAM = void 0;
const web3_js_1 = require("@solana/web3.js");
/**
 * The compute budget program.
 * Source: https://github.com/solana-labs/solana/blob/master/program-runtime/src/compute_budget.rs#L101
 */
exports.COMPUTE_BUDGET_PROGRAM = new web3_js_1.PublicKey("ComputeBudget111111111111111111111111111111");
__exportStar(require("./instructions"), exports);
//# sourceMappingURL=index.js.map