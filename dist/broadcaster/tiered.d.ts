import type { Blockhash, BlockhashWithExpiryBlockHeight, Commitment, ConfirmOptions, Connection, RpcResponseAndContext, SimulatedTransactionResponse, Transaction } from "@solana/web3.js";
import type { Broadcaster } from "../interfaces";
import { PendingTransaction } from "../transaction";
import type { BroadcastOptions } from "./index";
import { SingleConnectionBroadcaster } from "./index";
/**
 * Broadcasts transactions to multiple connections simultaneously.
 */
export declare class TieredBroadcaster implements Broadcaster {
    readonly primaryConnection: Connection;
    /**
     * Connections to send to in addition to the primary.
     */
    readonly fallbackConnections: readonly Connection[];
    readonly opts: ConfirmOptions;
    readonly premiumBroadcaster: SingleConnectionBroadcaster;
    constructor(primaryConnection: Connection, 
    /**
     * Connections to send to in addition to the primary.
     */
    fallbackConnections: readonly Connection[], opts?: ConfirmOptions);
    getLatestBlockhash(commitment?: Commitment): Promise<BlockhashWithExpiryBlockHeight>;
    getRecentBlockhash(commitment?: Commitment): Promise<Blockhash>;
    private _sendRawTransaction;
    /**
     * Broadcasts a signed transaction.
     *
     * @param tx
     * @param confirm
     * @param opts
     * @returns
     */
    broadcast(tx: Transaction, { printLogs, ...opts }?: BroadcastOptions): Promise<PendingTransaction>;
    /**
     * Simulates a transaction with a commitment.
     * @param tx
     * @param commitment
     * @returns
     */
    simulate(tx: Transaction, { commitment, verifySigners, }?: {
        commitment?: Commitment;
        verifySigners?: boolean;
    }): Promise<RpcResponseAndContext<SimulatedTransactionResponse>>;
}
