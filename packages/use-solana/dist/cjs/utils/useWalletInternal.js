"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletInternal = void 0;
const tslib_1 = require("tslib");
const fast_json_stable_stringify_1 = tslib_1.__importDefault(require("fast-json-stable-stringify"));
const react_1 = require("react");
const types_1 = require("../adapters/types");
const error_1 = require("../error");
const usePersistedKVStore_1 = require("./usePersistedKVStore");
const useWalletInternal = ({ onConnect, onDisconnect, network, endpoint, onError, storageAdapter, walletProviders, walletOptions, }) => {
    var _a;
    const [walletConfigStr, setWalletConfigStr] = (0, usePersistedKVStore_1.usePersistedKVStore)("use-solana/wallet-config", null, storageAdapter);
    const walletConfig = (0, react_1.useMemo)(() => {
        try {
            return walletConfigStr
                ? JSON.parse(walletConfigStr)
                : null;
        }
        catch (e) {
            console.warn("Error parsing wallet config", e);
            return null;
        }
    }, [walletConfigStr]);
    const { walletType, walletArgs } = walletConfig !== null && walletConfig !== void 0 ? walletConfig : {
        walletType: null,
        walletArgs: null,
    };
    const [connected, setConnected] = (0, react_1.useState)(false);
    const [walletActivating, setWalletActivating] = (0, react_1.useState)(false);
    const [walletProviderInfo, wallet] = (0, react_1.useMemo)(() => {
        if (walletType) {
            const provider = walletProviders[walletType];
            console.debug("New wallet", provider.url, network);
            const adapter = provider.makeAdapter(provider.url, endpoint, walletOptions);
            return [provider, new types_1.WrappedWalletAdapter(adapter)];
        }
        return [undefined, undefined];
    }, [walletProviders, walletType, network, endpoint, walletOptions]);
    (0, react_1.useEffect)(() => {
        let disabled = false;
        let timeout = null;
        if (wallet && walletProviderInfo) {
            timeout = setTimeout(() => {
                // Try connecting the wallet.
                // If we get a WalletNotReadyError, the wallet isn't ready yet,
                // so we should retry connecting, up to MAX_RETRIES times.
                void (async () => {
                    let numRetries = 0;
                    const MAX_RETRIES = 10;
                    let shouldTryConnect = true;
                    while (shouldTryConnect) {
                        try {
                            await wallet.connect(walletArgs);
                        }
                        catch (e) {
                            if ((e === null || e === void 0 ? void 0 : e.name) === "WalletNotReadyError") {
                                console.warn("Got WalletNotReadyError, retrying...");
                                numRetries++;
                                if (numRetries <= MAX_RETRIES) {
                                    await new Promise((e) => setTimeout(e, 1000));
                                    continue;
                                }
                            }
                            onError(new error_1.WalletAutomaticConnectionError(e, walletProviderInfo));
                        }
                        shouldTryConnect = false;
                    }
                })();
            }, 1000);
            wallet.on("connect", () => {
                if (disabled) {
                    return;
                }
                if (wallet.publicKey) {
                    setConnected(true);
                    setWalletActivating(false);
                    onConnect(wallet, walletProviderInfo);
                }
            });
            wallet.on("disconnect", () => {
                if (disabled) {
                    return;
                }
                setConnected(false);
                setWalletActivating(false);
                onDisconnect(wallet, walletProviderInfo);
            });
        }
        return () => {
            if (wallet && wallet.connected) {
                const disconnect = wallet.disconnect();
                if (disconnect) {
                    disconnect.catch((e) => {
                        onError(new error_1.WalletDisconnectError(e, walletProviderInfo));
                    });
                }
            }
            if (timeout) {
                clearTimeout(timeout);
            }
            disabled = true;
        };
    }, [
        onConnect,
        onDisconnect,
        onError,
        wallet,
        walletArgs,
        walletProviderInfo,
    ]);
    const activate = (0, react_1.useCallback)(async (nextWalletType, nextWalletArgs) => {
        setWalletActivating(true);
        const nextWalletConfigStr = (0, fast_json_stable_stringify_1.default)({
            walletType: nextWalletType,
            walletArgs: nextWalletArgs !== null && nextWalletArgs !== void 0 ? nextWalletArgs : null,
        });
        if (walletConfigStr === nextWalletConfigStr) {
            // reconnect
            try {
                await (wallet === null || wallet === void 0 ? void 0 : wallet.connect(nextWalletArgs));
            }
            catch (e) {
                onError(new error_1.WalletActivateError(e, nextWalletType, nextWalletArgs));
            }
            setWalletActivating(false);
        }
        await setWalletConfigStr(nextWalletConfigStr);
    }, [onError, setWalletConfigStr, wallet, walletConfigStr]);
    const disconnect = (0, react_1.useCallback)(async () => {
        await (wallet === null || wallet === void 0 ? void 0 : wallet.disconnect());
        await setWalletConfigStr(null);
    }, [setWalletConfigStr, wallet]);
    return {
        wallet,
        walletProviderInfo,
        walletActivating,
        connected,
        publicKey: (_a = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) !== null && _a !== void 0 ? _a : undefined,
        activate,
        disconnect,
    };
};
exports.useWalletInternal = useWalletInternal;
//# sourceMappingURL=useWalletInternal.js.map