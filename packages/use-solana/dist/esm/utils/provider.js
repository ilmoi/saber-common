import { DEFAULT_PROVIDER_OPTIONS, SingleConnectionBroadcaster, SolanaProvider, SolanaTransactionSigner, TieredBroadcaster, } from "@saberhq/solana-contrib";
import invariant from "tiny-invariant";
export class WalletAdapterTransactionSigner extends SolanaTransactionSigner {
    constructor(connection, wallet, broadcaster, preflightCommitment = "confirmed") {
        super(wallet, broadcaster, preflightCommitment);
        this.connection = connection;
        this.wallet = wallet;
    }
    async signAndBroadcastTransaction(transaction, opts) {
        return await this.wallet.signAndBroadcastTransaction(transaction, this.connection, this.broadcaster, opts);
    }
}
export class WalletAdapterProvider extends SolanaProvider {
    /**
     * @param connection The cluster connection where the program is deployed.
     * @param sendConnection The connection where transactions are sent to.
     * @param wallet     The wallet used to pay for and sign all transactions.
     * @param opts       Transaction confirmation options to use by default.
     */
    constructor(connection, broadcaster, wallet, opts = DEFAULT_PROVIDER_OPTIONS) {
        super(connection, broadcaster, wallet, opts, new WalletAdapterTransactionSigner(connection, wallet, broadcaster, opts.preflightCommitment));
        this.wallet = wallet;
    }
    /**
     * Initializes a new SolanaProvider.
     */
    static init({ connection, broadcastConnections = [connection], wallet, opts = DEFAULT_PROVIDER_OPTIONS, }) {
        const firstBroadcastConnection = broadcastConnections[0];
        invariant(firstBroadcastConnection, "must have at least one broadcast connection");
        return new WalletAdapterProvider(connection, broadcastConnections.length > 1
            ? new TieredBroadcaster(connection, broadcastConnections, opts)
            : new SingleConnectionBroadcaster(firstBroadcastConnection, opts), wallet, opts);
    }
}
//# sourceMappingURL=provider.js.map