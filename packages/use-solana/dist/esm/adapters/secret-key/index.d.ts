import type { Broadcaster, PendingTransaction, SignAndBroadcastOptions } from "@saberhq/solana-contrib";
import { SignerWallet } from "@saberhq/solana-contrib";
import type { Connection, PublicKey, Transaction } from "@solana/web3.js";
import EventEmitter from "eventemitter3";
import type { WalletAdapter } from "../types";
/**
 * Adapter backed by a secret key.
 */
export declare class SecretKeyAdapter extends EventEmitter implements WalletAdapter {
    _wallet?: SignerWallet;
    _publicKey?: PublicKey;
    _connected: boolean;
    constructor();
    get connected(): boolean;
    get autoApprove(): boolean;
    signAndBroadcastTransaction(transaction: Transaction, _connection: Connection, broadcaster: Broadcaster, opts?: SignAndBroadcastOptions): Promise<PendingTransaction>;
    signAllTransactions(transactions: Transaction[]): Promise<Transaction[]>;
    get publicKey(): PublicKey | null;
    signTransaction(transaction: Transaction): Promise<Transaction>;
    connect: (args?: unknown) => Promise<void>;
    disconnect(): void;
}
//# sourceMappingURL=index.d.ts.map