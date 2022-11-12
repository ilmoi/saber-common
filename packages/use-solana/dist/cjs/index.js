"use strict";
/**
 * [[include:use-solana/README.md]]
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.solana = exports.icons = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./adapters/index.js"), exports);
tslib_1.__exportStar(require("./context.js"), exports);
tslib_1.__exportStar(require("./error.js"), exports);
tslib_1.__exportStar(require("./hooks.js"), exports);
tslib_1.__exportStar(require("./providers.js"), exports);
tslib_1.__exportStar(require("./storage.js"), exports);
tslib_1.__exportStar(require("./utils/provider.js"), exports);
exports.icons = tslib_1.__importStar(require("@saberhq/wallet-adapter-icons"));
// re-export solana utils
exports.solana = tslib_1.__importStar(require("@saberhq/solana-contrib"));
//# sourceMappingURL=index.js.map