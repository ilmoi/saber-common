import type { Broadcaster, PendingTransaction, SignAndBroadcastOptions } from "@saberhq/solana-contrib";
import { SolanaProvider, SolanaTransactionSigner } from "@saberhq/solana-contrib";
import type { Commitment, ConfirmOptions, Connection, Transaction } from "@solana/web3.js";
import type { ConnectedWallet } from "../adapters";
export declare class WalletAdapterTransactionSigner extends SolanaTransactionSigner {
    readonly connection: Connection;
    readonly wallet: ConnectedWallet;
    constructor(connection: Connection, wallet: ConnectedWallet, broadcaster: Broadcaster, preflightCommitment?: Commitment);
    signAndBroadcastTransaction(transaction: Transaction, opts?: SignAndBroadcastOptions): Promise<PendingTransaction>;
}
export declare class WalletAdapterProvider extends SolanaProvider {
    readonly wallet: ConnectedWallet;
    /**
     * @param connection The cluster connection where the program is deployed.
     * @param sendConnection The connection where transactions are sent to.
     * @param wallet     The wallet used to pay for and sign all transactions.
     * @param opts       Transaction confirmation options to use by default.
     */
    constructor(connection: Connection, broadcaster: Broadcaster, wallet: ConnectedWallet, opts?: ConfirmOptions);
    /**
     * Initializes a new SolanaProvider.
     */
    static init({ connection, broadcastConnections, wallet, opts, }: {
        /**
         * Connection used for general reads
         */
        readonly connection: Connection;
        /**
         * Connections used for broadcasting transactions. Defaults to the read connection.
         */
        readonly broadcastConnections?: readonly Connection[];
        /**
         * Wallet used for signing transactions
         */
        readonly wallet: ConnectedWallet;
        /**
         * Confirmation options
         */
        readonly opts?: ConfirmOptions;
    }): WalletAdapterProvider;
}
//# sourceMappingURL=provider.d.ts.map