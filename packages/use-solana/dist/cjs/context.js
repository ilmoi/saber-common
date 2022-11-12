"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSolana = exports.SolanaProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const unstated_next_1 = require("unstated-next");
const error_1 = require("./error");
const providers_1 = require("./providers");
const storage_1 = require("./storage");
const useConnectionInternal_1 = require("./utils/useConnectionInternal");
const useProviderInternal_1 = require("./utils/useProviderInternal");
const useWalletInternal_1 = require("./utils/useWalletInternal");
const defaultOnConnect = (wallet, provider) => {
    console.log(`Connected to ${provider.name} wallet: ${wallet.publicKey.toString()}`);
};
const defaultOnDisconnect = (_wallet, provider) => {
    console.log(`Disconnected from ${provider.name} wallet`);
};
const defaultOnError = (err) => {
    if (err.level === error_1.ErrorLevel.WARN) {
        console.warn(err);
    }
    else {
        console.error(err);
    }
};
/**
 * Provides Solana.
 * @returns
 */
const useSolanaInternal = ({ onConnect = defaultOnConnect, onDisconnect = defaultOnDisconnect, onError = defaultOnError, storageAdapter = storage_1.LOCAL_STORAGE_ADAPTER, walletProviders = providers_1.DEFAULT_WALLET_PROVIDERS, walletOptions, 
// useProvider args
broadcastConnections, confirmOptions, ...connectionArgs } = {}) => {
    const connectionCtx = (0, useConnectionInternal_1.useConnectionInternal)({
        ...connectionArgs,
        storageAdapter,
    });
    const { network, endpoint } = connectionCtx;
    const walletCtx = (0, useWalletInternal_1.useWalletInternal)({
        onConnect,
        onDisconnect,
        network,
        endpoint,
        onError,
        storageAdapter,
        walletProviders,
        walletOptions,
    });
    const providerCtx = (0, useProviderInternal_1.useProviderInternal)({
        connection: connectionCtx.connection,
        wallet: walletCtx.wallet,
        sendConnection: connectionCtx.sendConnection,
        commitment: connectionArgs.commitment,
        broadcastConnections,
        confirmOptions,
    });
    return {
        ...walletCtx,
        ...connectionCtx,
        ...providerCtx,
    };
};
const Solana = (0, unstated_next_1.createContainer)(useSolanaInternal);
/**
 * Provides a Solana SDK.
 *
 * Note: ensure that `onConnect` and `onDisconnect` are wrapped in useCallback or are
 * statically defined, otherwise the wallet will keep re-rendering.
 * @returns
 */
const SolanaProvider = ({ children, ...args }) => ((0, jsx_runtime_1.jsx)(Solana.Provider, { initialState: args, children: children }));
exports.SolanaProvider = SolanaProvider;
/**
 * Fetches the loaded Solana SDK.
 */
const useSolana = () => (0, unstated_next_1.useContainer)(Solana);
exports.useSolana = useSolana;
//# sourceMappingURL=context.js.map