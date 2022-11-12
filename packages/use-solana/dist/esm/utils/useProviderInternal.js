import { DEFAULT_PROVIDER_OPTIONS, SolanaAugmentedProvider, SolanaReadonlyProvider, } from "@saberhq/solana-contrib";
import { useMemo } from "react";
import { WalletAdapterProvider } from "./provider";
export const useProviderInternal = ({ connection, sendConnection = connection, broadcastConnections = [sendConnection], wallet, commitment = "confirmed", confirmOptions = DEFAULT_PROVIDER_OPTIONS, }) => {
    const provider = useMemo(() => new SolanaReadonlyProvider(connection, {
        commitment,
    }), [commitment, connection]);
    const connected = wallet === null || wallet === void 0 ? void 0 : wallet.connected;
    const publicKey = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey;
    const providerMut = useMemo(() => wallet && connected && publicKey
        ? new SolanaAugmentedProvider(WalletAdapterProvider.init({
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
//# sourceMappingURL=useProviderInternal.js.map