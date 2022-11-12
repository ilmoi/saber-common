"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProviderInternal = void 0;
const solana_contrib_1 = require("@saberhq/solana-contrib");
const react_1 = require("react");
const provider_1 = require("./provider");
const useProviderInternal = ({ connection, sendConnection = connection, broadcastConnections = [sendConnection], wallet, commitment = "confirmed", confirmOptions = solana_contrib_1.DEFAULT_PROVIDER_OPTIONS, }) => {
    const provider = (0, react_1.useMemo)(() => new solana_contrib_1.SolanaReadonlyProvider(connection, {
        commitment,
    }), [commitment, connection]);
    const connected = wallet === null || wallet === void 0 ? void 0 : wallet.connected;
    const publicKey = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey;
    const providerMut = (0, react_1.useMemo)(() => wallet && connected && publicKey
        ? new solana_contrib_1.SolanaAugmentedProvider(provider_1.WalletAdapterProvider.init({
            connection,
            broadcastConnections,
            wallet: wallet,
            opts: confirmOptions,
        }))
        : null, [
        wallet,
        connected,
        publicKey,
        connection,
        broadcastConnections,
        confirmOptions,
    ]);
    return {
        provider,
        providerMut,
    };
};
exports.useProviderInternal = useProviderInternal;
//# sourceMappingURL=useProviderInternal.js.map