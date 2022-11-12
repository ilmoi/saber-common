"use strict";
/**
 * [[include:chai-solana/README.md]]
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.chaiSolana = void 0;
const tslib_1 = require("tslib");
require("./types.js");
const anchor_1 = require("@project-serum/anchor");
const token_utils_1 = require("@saberhq/token-utils");
const web3_js_1 = require("@solana/web3.js");
const chai_as_promised_1 = tslib_1.__importDefault(require("chai-as-promised"));
const chai_bn_1 = tslib_1.__importDefault(require("chai-bn"));
tslib_1.__exportStar(require("./debugAccountOwners.js"), exports);
tslib_1.__exportStar(require("./expectTXTable.js"), exports);
tslib_1.__exportStar(require("./printInstructionLogs.js"), exports);
tslib_1.__exportStar(require("./utils.js"), exports);
const chaiSolana = (chai) => {
    chai.use((0, chai_bn_1.default)(anchor_1.BN));
    chai.use(chai_as_promised_1.default);
    chai.config.includeStack = true;
    chai.use((chai) => {
        chai.Assertion.addProperty("tokenAmount", function () {
            const assert = this.assert.bind(this);
            const obj = this._obj;
            const equal = function (value, message) {
                const amount = value instanceof token_utils_1.TokenAmount ? value.toU64() : value;
                const msgPrefix = message ? `${message}: ` : "";
                const myAmount = obj;
                if (value instanceof token_utils_1.TokenAmount) {
                    assert(myAmount.token.equals(value.token), `${msgPrefix}token mismatch: #{this} to equal #{exp} but got #{act}`, `${msgPrefix}token mismatch: expected #{this} to not equal #{act}`, {
                        address: value.token.address,
                        decimals: value.token.decimals,
                        network: value.token.network,
                    }, {
                        address: myAmount.token.address,
                        decimals: myAmount.token.decimals,
                        network: myAmount.token.network,
                    });
                }
                const otherAmt = new token_utils_1.TokenAmount(myAmount.token, amount.toString());
                assert(myAmount.equalTo(otherAmt), `${msgPrefix}expected #{this} to equal #{exp} but got #{act}`, `${msgPrefix}expected #{this} to not equal #{exp} but got #{act}`, otherAmt.format(), myAmount.format());
            };
            return {
                equal,
                equals: equal,
                eq: equal,
                zero: () => {
                    equal(0);
                },
            };
        });
        chai.Assertion.addMethod("eqAddress", function (otherKey, message) {
            const obj = this._obj;
            this.assert((obj === null || obj === void 0 ? void 0 : obj._bn) ||
                obj instanceof web3_js_1.PublicKey ||
                typeof obj === "string", "expected #{this} to be a PublicKey or address string", "expected #{this} to not be a PublicKey or address string", true, obj);
            const key = obj;
            const myKey = typeof key === "string" ? new web3_js_1.PublicKey(key) : key;
            const theirKey = typeof otherKey === "string" ? new web3_js_1.PublicKey(otherKey) : otherKey;
            const msgPrefix = message ? `${message}: ` : "";
            this.assert(myKey.equals(theirKey), `${msgPrefix}expected #{this} to equal #{exp} but got #{act}`, `${msgPrefix}expected #{this} to not equal #{act}`, otherKey.toString(), myKey.toString());
        });
        chai.Assertion.addMethod("eqAmount", function (other, message) {
            const obj = this._obj;
            const myAmount = obj;
            const msgPrefix = message ? `${message}: ` : "";
            this.assert(myAmount.token.equals(other.token), `${msgPrefix}token mismatch: #{this} to equal #{exp} but got #{act}`, `${msgPrefix}token mismatch: expected #{this} to not equal #{act}`, myAmount.token, other.token);
            this.assert(myAmount.raw.toString() === other.raw.toString(), `${msgPrefix}expected #{this} to equal #{exp} but got #{act}`, `${msgPrefix}expected #{this} to not equal #{act}`, myAmount.toString(), other.toString());
        });
    });
};
exports.chaiSolana = chaiSolana;
//# sourceMappingURL=index.js.map