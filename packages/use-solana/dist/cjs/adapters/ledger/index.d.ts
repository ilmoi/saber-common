import type Transport from "@ledgerhq/hw-transport";
import type { Broadcaster, PendingTransaction, SignAndBroadcastOptions } from "@saberhq/solana-contrib";
import type { Connection, PublicKey, Transaction } from "@solana/web3.js";
import EventEmitter from "eventemitter3";
import type { WalletAdapter } from "../types";
export interface LedgerHDWalletPath {
    account?: number;
    change?: number;
}
/**
 * An account associated with the connected Ledger device.
 */
export interface LedgerHDWalletAccount extends LedgerHDWalletPath {
    key: PublicKey;
}
export declare class LedgerWalletAdapter extends EventEmitter implements WalletAdapter {
    private _connecting;
    private _publicKey;
    private _transport;
    private _derivationPath;
    constructor();
    get publicKey(): PublicKey | null;
    get connected(): boolean;
    get autoApprove(): boolean;
    signAndBroadcastTransaction(transaction: Transaction, _connection: Connection, broadcaster: Broadcaster, opts?: SignAndBroadcastOptions): Promise<PendingTransaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    connect(args?: unknown): Promise<void>;
    disconnect(): Promise<void>;
    /**
     * Ledger transport.
     */
    get transport(): Transport | null;
    /**
     * Fetches accounts associated with the given derivation paths.
     *
     * @param paths
     * @returns
     */
    static fetchAccountsForPaths(paths: LedgerHDWalletPath[]): Promise<LedgerHDWalletAccount[]>;
}
export declare class LedgerError extends Error {
    constructor(error: Error);
}
//# sourceMappingURL=index.d.ts.map