import type { Connection } from "@solana/web3.js";
import type { DefaultWalletType, WalletTypeEnum } from ".";
import type { ConnectedWallet } from "./adapters/types";
import type { UseSolana } from "./context";
import type { ConnectionContext } from "./utils/useConnectionInternal";
/**
 * Gets the current Solana wallet.
 */
export declare function useWallet<WalletType extends WalletTypeEnum<WalletType> = typeof DefaultWalletType>(): UseSolana<WalletType>;
/**
 * Gets the current Solana wallet, returning null if it is not connected.
 */
export declare const useConnectedWallet: () => ConnectedWallet | null;
/**
 * Loads the connection context
 * @returns
 */
export declare function useConnectionContext(): ConnectionContext;
/**
 * Gets the read connection
 * @returns
 */
export declare function useConnection(): Connection;
/**
 * Gets the send connection
 * @returns
 */
export declare function useSendConnection(): Connection;
//# sourceMappingURL=hooks.d.ts.map