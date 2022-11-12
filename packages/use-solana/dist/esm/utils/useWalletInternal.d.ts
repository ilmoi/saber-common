import type { Network } from "@saberhq/solana-contrib";
import type { PublicKey } from "@solana/web3.js";
import type { WalletAdapter, WalletOptions } from "../adapters/types";
import type { UseSolanaError } from "../error";
import type { WalletProviderInfo, WalletProviderMap, WalletTypeEnum } from "../providers";
import type { StorageAdapter } from "../storage";
/**
 * Wallet-related information.
 */
export interface UseWallet<WalletType extends WalletTypeEnum<WalletType>, Connected extends boolean = boolean> {
    /**
     * Wallet.
     */
    wallet?: WalletAdapter<Connected>;
    /**
     * Wallet public key.
     */
    publicKey: Connected extends true ? PublicKey : undefined;
    /**
     * Information about the wallet used.
     */
    walletProviderInfo?: WalletProviderInfo;
    /**
     * Whether the provider is switching to a new wallet.
     */
    walletActivating: boolean;
    /**
     * Whether or not the wallet is connected.
     */
    connected: Connected;
    /**
     * Activates a new wallet.
     */
    activate: (walletType: WalletType[keyof WalletType], walletArgs?: Record<string, unknown>) => Promise<void>;
    /**
     * Disconnects the wallet and prevents auto-reconnect.
     */
    disconnect: () => Promise<void>;
}
export interface UseWalletArgs<WalletType extends WalletTypeEnum<WalletType>> {
    onConnect: (wallet: WalletAdapter<true>, provider: WalletProviderInfo) => void;
    onDisconnect: (wallet: WalletAdapter<false>, provider: WalletProviderInfo) => void;
    onError: (err: UseSolanaError) => void;
    network: Network;
    endpoint: string;
    storageAdapter: StorageAdapter;
    walletProviders: WalletProviderMap<WalletType>;
    walletOptions?: WalletOptions;
}
export declare const useWalletInternal: <WalletType extends WalletTypeEnum<WalletType>>({ onConnect, onDisconnect, network, endpoint, onError, storageAdapter, walletProviders, walletOptions, }: UseWalletArgs<WalletType>) => UseWallet<WalletType, boolean>;
//# sourceMappingURL=useWalletInternal.d.ts.map