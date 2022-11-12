import type { ReactNode } from "react";
import type { DefaultWalletType, WalletTypeEnum } from ".";
import type { UseSolanaError } from "./error";
import type { ConnectionArgs, ConnectionContext } from "./utils/useConnectionInternal";
import type { UseProvider, UseProviderArgs } from "./utils/useProviderInternal";
import type { UseWallet, UseWalletArgs } from "./utils/useWalletInternal";
export interface UseSolana<WalletType extends WalletTypeEnum<WalletType> = typeof DefaultWalletType, Connected extends boolean = boolean> extends ConnectionContext, UseWallet<WalletType, Connected>, UseProvider {
}
export interface UseSolanaArgs<WalletType extends WalletTypeEnum<WalletType> = typeof DefaultWalletType> extends Omit<ConnectionArgs, "storageAdapter">, Partial<Pick<UseWalletArgs<WalletType>, "onConnect" | "onDisconnect" | "storageAdapter" | "walletProviders" | "walletOptions">>, Pick<UseProviderArgs, "broadcastConnections" | "confirmOptions"> {
    /**
     * Called when an error is thrown.
     */
    onError?: (err: UseSolanaError) => void;
}
declare type ProviderProps<WalletType extends WalletTypeEnum<WalletType>> = UseSolanaArgs<WalletType> & {
    children: ReactNode;
};
/**
 * Provides a Solana SDK.
 *
 * Note: ensure that `onConnect` and `onDisconnect` are wrapped in useCallback or are
 * statically defined, otherwise the wallet will keep re-rendering.
 * @returns
 */
export declare const SolanaProvider: <WalletType extends WalletTypeEnum<WalletType> = typeof DefaultWalletType>({ children, ...args }: ProviderProps<WalletType>) => JSX.Element;
/**
 * Fetches the loaded Solana SDK.
 */
export declare const useSolana: <WalletType extends WalletTypeEnum<WalletType>>() => UseSolana<WalletType, boolean>;
export {};
//# sourceMappingURL=context.d.ts.map