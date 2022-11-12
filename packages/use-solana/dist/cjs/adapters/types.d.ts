import type { Broadcaster, PendingTransaction, SignAndBroadcastOptions, Wallet } from "@saberhq/solana-contrib";
import { PublicKey } from "@saberhq/solana-contrib";
import type { WalletConnectWalletAdapterConfig } from "@solana/wallet-adapter-walletconnect";
import type { Connection, PublicKey as SolanaPublicKey, Transaction } from "@solana/web3.js";
export interface WalletAdapter<Connected extends boolean = boolean> extends Omit<Wallet, "publicKey"> {
    publicKey: Connected extends true ? SolanaPublicKey : null;
    autoApprove: boolean;
    connected: Connected;
    connect: (args?: unknown) => Promise<void>;
    disconnect: () => void | Promise<void>;
    on(event: "connect" | "disconnect", fn: () => void): void;
    /**
     * Signs and broadcasts a transaction.
     *
     * @param transaction
     * @param broadcaster
     * @param options
     */
    signAndBroadcastTransaction(transaction: Transaction, connection: Connection, broadcaster: Broadcaster, opts?: SignAndBroadcastOptions): Promise<PendingTransaction>;
}
export declare type ConnectedWallet = WalletAdapter<true> & Wallet;
export declare type WalletOptions = WalletConnectWalletAdapterConfig;
export declare type WalletAdapterBuilder = (providerUrl: string, endpoint: string, options?: WalletOptions) => WalletAdapter;
/**
 * Wallet adapter wrapper with caching of the PublicKey built-in.
 */
export declare class WrappedWalletAdapter<Connected extends boolean = boolean> implements Omit<WalletAdapter<Connected>, "publicKey"> {
    readonly adapter: WalletAdapter<Connected>;
    constructor(adapter: WalletAdapter<Connected>);
    private _prevPubkey;
    private _publicKeyCached;
    get publicKey(): Connected extends true ? PublicKey : null;
    get autoApprove(): boolean;
    get connected(): Connected;
    signAndBroadcastTransaction(transaction: Transaction, connection: Connection, broadcaster: Broadcaster, opts?: SignAndBroadcastOptions): Promise<PendingTransaction>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    signAllTransactions(transaction: Transaction[]): Promise<Transaction[]>;
    connect(args?: unknown): Promise<void>;
    disconnect(): Promise<void>;
    on(event: "connect" | "disconnect", fn: () => void): void;
}
//# sourceMappingURL=types.d.ts.map