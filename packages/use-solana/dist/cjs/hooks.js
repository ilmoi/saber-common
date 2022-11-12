"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendConnection = exports.useConnection = exports.useConnectionContext = exports.useConnectedWallet = exports.useWallet = void 0;
const context_1 = require("./context");
/**
 * Gets the current Solana wallet.
 */
function useWallet() {
    const context = (0, context_1.useSolana)();
    if (!context) {
        throw new Error("wallet not loaded");
    }
    return context;
}
exports.useWallet = useWallet;
/**
 * Gets the current Solana wallet, returning null if it is not connected.
 */
const useConnectedWallet = () => {
    const { wallet, connected, walletActivating } = useWallet();
    if (!(wallet === null || wallet === void 0 ? void 0 : wallet.connected) ||
        !connected ||
        !wallet.publicKey ||
        walletActivating) {
        return null;
    }
    return wallet;
};
exports.useConnectedWallet = useConnectedWallet;
/**
 * Loads the connection context
 * @returns
 */
function useConnectionContext() {
    const context = (0, context_1.useSolana)();
    if (!context) {
        throw new Error("Not in context");
    }
    return context;
}
exports.useConnectionContext = useConnectionContext;
/**
 * Gets the read connection
 * @returns
 */
function useConnection() {
    return useConnectionContext().connection;
}
exports.useConnection = useConnection;
/**
 * Gets the send connection
 * @returns
 */
function useSendConnection() {
    return useConnectionContext().sendConnection;
}
exports.useSendConnection = useSendConnection;
//# sourceMappingURL=hooks.js.map