import { jsx as _jsx } from "react/jsx-runtime";
import { createContainer, useContainer } from "unstated-next";
import { ErrorLevel } from "./error";
import { DEFAULT_WALLET_PROVIDERS } from "./providers";
import { LOCAL_STORAGE_ADAPTER } from "./storage";
import { useConnectionInternal } from "./utils/useConnectionInternal";
import { useProviderInternal } from "./utils/useProviderInternal";
import { useWalletInternal } from "./utils/useWalletInternal";
const defaultOnConnect = (wallet, provider) => {
    console.log(`Connected to ${provider.name} wallet: ${wallet.publicKey.toString()}`);
};
const defaultOnDisconnect = (_wallet, provider) => {
    console.log(`Disconnected from ${provider.name} wallet`);
};
const defaultOnError = (err) => {
    if (err.level === ErrorLevel.WARN) {
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
const useSolanaInternal = ({ onConnect = defaultOnConnect, onDisconnect = defaultOnDisconnect, onError = defaultOnError, storageAdapter = LOCAL_STORAGE_ADAPTER, walletProviders = DEFAULT_WALLET_PROVIDERS, walletOptions, 
// useProvider args
broadcastConnections, confirmOptions, ...connectionArgs } = {}) => {
    const connectionCtx = useConnectionInternal({
        ...connectionArgs,
        storageAdapter,
    });
    const { network, endpoint } = connectionCtx;
    const walletCtx = useWalletInternal({
        onConnect,
        onDisconnect,
        network,
        endpoint,
        onError,
        storageAdapter,
        walletProviders,
        walletOptions,
    });
    const providerCtx = useProviderInternal({
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
const Solana = createContainer(useSolanaInternal);
/**
 * Provides a Solana SDK.
 *
 * Note: ensure that `onConnect` and `onDisconnect` are wrapped in useCallback or are
 * statically defined, otherwise the wallet will keep re-rendering.
 * @returns
 */
export const SolanaProvider = ({ children, ...args }) => (_jsx(Solana.Provider, { initialState: args, children: children }));
/**
 * Fetches the loaded Solana SDK.
 */
export const useSolana = () => useContainer(Solana);
//# sourceMappingURL=context.js.map