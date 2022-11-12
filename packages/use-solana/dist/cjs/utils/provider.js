"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAdapterProvider = exports.WalletAdapterTransactionSigner = void 0;
const tslib_1 = require("tslib");
const solana_contrib_1 = require("@saberhq/solana-contrib");
const tiny_invariant_1 = tslib_1.__importDefault(require("tiny-invariant"));
class WalletAdapterTransactionSigner extends solana_contrib_1.SolanaTransactionSigner {
    constructor(connection, wallet, broadcaster, preflightCommitment = "confirmed") {
        super(wallet, broadcaster, preflightCommitment);
        this.connection = connection;
        this.wallet = wallet;
    }
    async signAndBroadcastTransaction(transaction, opts) {
        return await this.wallet.signAndBroadcastTransaction(transaction, this.connection, this.broadcaster, opts);
    }
}
exports.WalletAdapterTransactionSigner = WalletAdapterTransactionSigner;
class WalletAdapterProvider extends solana_contrib_1.SolanaProvider {
    /**
     * @param connection The cluster connection where the program is deployed.
     * @param sendConnection The connection where transactions are sent to.
     * @param wallet     The wallet used to pay for and sign all transactions.
     * @param opts       Transaction confirmation options to use by default.
     */
    constructor(connection, broadcaster, wallet, opts = solana_contrib_1.DEFAULT_PROVIDER_OPTIONS) {
        super(connection, broadcaster, wallet, opts, new WalletAdapterTransactionSigner(connection, wallet, broadcaster, opts.preflightCommitment));
        this.wallet = wallet;
    }
    /**
     * Initializes a new SolanaProvider.
     */
    static init({ connection, broadcastConnections = [connection], wallet, opts = solana_contrib_1.DEFAULT_PROVIDER_OPTIONS, }) {
        const firstBroadcastConnection = broadcastConnections[0];
        (0, tiny_invariant_1.default)(firstBroadcastConnection, "must have at least one broadcast connection");
        return new WalletAdapterProvider(connection, broadcastConnections.length > 1
            ? new solana_contrib_1.TieredBroadcaster(connection, broadcastConnections, opts)
            : new solana_contrib_1.SingleConnectionBroadcaster(firstBroadcastConnection, opts), wallet, opts);
    }
}
exports.WalletAdapterProvider = WalletAdapterProvider;
//# sourceMappingURL=provider.js.map