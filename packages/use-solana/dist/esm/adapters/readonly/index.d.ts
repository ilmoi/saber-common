import type { Broadcaster, BroadcastOptions, PendingTransaction } from "@saberhq/solana-contrib";
import type { Connection, Transaction } from "@solana/web3.js";
import { PublicKey } from "@solana/web3.js";
import { EventEmitter } from "eventemitter3";
import type { WalletAdapter } from "../types";
declare global {
    interface Window {
        /**
         * Allows setting the pubkey for the ReadonlyAdapter.
         */
        USE_SOLANA_PUBKEY_OVERRIDE?: string;
    }
}
/**
 * Sets the readonly Solana pubkey.
 * @param pubkey
 */
export declare const setReadonlySolanaPubkey: (pubkey: PublicKey) => void;
/**
 * Adapter that cannot sign transactions. Dummy for testing.
 */
export declare class ReadonlyAdapter extends EventEmitter implements WalletAdapter {
    private _publicKey;
    constructor();
    get connected(): boolean;
    get autoApprove(): boolean;
    get publicKey(): PublicKey | null;
    signAndBroadcastTransaction(_transaction: Transaction, _connection: Connection, _broadcaster: Broadcaster, _opts?: BroadcastOptions): Promise<PendingTransaction>;
    signAllTransactions(_transactions: Transaction[]): Promise<Transaction[]>;
    signTransaction(_transaction: Transaction): Promise<Transaction>;
    connect: () => Promise<void>;
    disconnect(): void;
}
//# sourceMappingURL=index.d.ts.map