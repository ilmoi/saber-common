import type { Broadcaster, SignAndBroadcastOptions } from "@saberhq/solana-contrib";
import { PendingTransaction } from "@saberhq/solana-contrib";
import type { EventEmitter, SignerWalletAdapter, WalletAdapterEvents } from "@solana/wallet-adapter-base";
import type { Connection, PublicKey, Transaction } from "@solana/web3.js";
import type { WalletAdapter } from "./types";
export declare class SolanaWalletAdapter implements WalletAdapter {
    readonly adapter: Omit<SignerWalletAdapter, "sendTransaction" | keyof EventEmitter | "signTransaction" | "signAllTransactions"> & EventEmitter<WalletAdapterEvents> & {
        signTransaction: (transaction: Transaction) => Promise<Transaction>;
        signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
    };
    constructor(adapter: Omit<SignerWalletAdapter, "sendTransaction" | keyof EventEmitter | "signTransaction" | "signAllTransactions"> & EventEmitter<WalletAdapterEvents> & {
        signTransaction: (transaction: Transaction) => Promise<Transaction>;
        signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
    });
    signAndBroadcastTransaction(transaction: Transaction, connection: Connection, broadcaster: Broadcaster, opts?: SignAndBroadcastOptions): Promise<PendingTransaction>;
    get connected(): boolean;
    get autoApprove(): boolean;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    get publicKey(): PublicKey | null;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    connect: () => Promise<void>;
    disconnect(): Promise<void>;
    on(event: "connect" | "disconnect", fn: () => void): void;
}
//# sourceMappingURL=solana.d.ts.map