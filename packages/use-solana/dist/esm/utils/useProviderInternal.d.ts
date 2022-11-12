import type { AugmentedProvider, ReadonlyProvider } from "@saberhq/solana-contrib";
import type { Commitment, ConfirmOptions, Connection } from "@solana/web3.js";
import type { WalletAdapter } from "../adapters/types";
/**
 * Wallet-related information.
 */
export interface UseProvider {
    /**
     * Read-only provider.
     */
    provider: ReadonlyProvider;
    /**
     * {@link Provider} of the currently connected wallet.
     */
    providerMut: AugmentedProvider | null;
}
export interface UseProviderArgs {
    /**
     * Connection.
     */
    connection: Connection;
    /**
     * Send connection.
     */
    sendConnection?: Connection;
    /**
     * Broadcast connections.
     */
    broadcastConnections?: Connection[];
    /**
     * Wallet.
     */
    wallet?: WalletAdapter<boolean>;
    /**
     * Commitment for the read-only provider.
     */
    commitment?: Commitment;
    /**
     * Confirm options for the mutable provider.
     */
    confirmOptions?: ConfirmOptions;
}
export declare const useProviderInternal: ({ connection, sendConnection, broadcastConnections, wallet, commitment, confirmOptions, }: UseProviderArgs) => UseProvider;
//# sourceMappingURL=useProviderInternal.d.ts.map