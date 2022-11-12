"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerError = exports.LedgerWalletAdapter = void 0;
const tslib_1 = require("tslib");
const hw_transport_webusb_1 = tslib_1.__importDefault(require("@ledgerhq/hw-transport-webusb"));
const solana_contrib_1 = require("@saberhq/solana-contrib");
const eventemitter3_1 = tslib_1.__importDefault(require("eventemitter3"));
const core_1 = require("./core");
const DEFAULT_DERIVATION_PATH = (0, core_1.getSolanaDerivationPath)();
class LedgerWalletAdapter extends eventemitter3_1.default {
    constructor() {
        super();
        this._connecting = false;
        this._publicKey = null;
        this._transport = null;
        this._derivationPath = DEFAULT_DERIVATION_PATH;
    }
    get publicKey() {
        var _a;
        return (_a = this._publicKey) !== null && _a !== void 0 ? _a : null;
    }
    get connected() {
        return this._publicKey !== null;
    }
    get autoApprove() {
        return false;
    }
    async signAndBroadcastTransaction(transaction, _connection, broadcaster, opts) {
        return await (0, solana_contrib_1.doSignAndBroadcastTransaction)(this, transaction, broadcaster, opts);
    }
    async signAllTransactions(transactions) {
        const result = [];
        for (let i = 0; i < transactions.length; i++) {
            const transaction = transactions[i];
            if (transaction) {
                const signed = await this.signTransaction(transaction);
                result.push(signed);
            }
        }
        return result;
    }
    async signTransaction(transaction) {
        if (!this._transport || !this._publicKey) {
            throw new Error("Not connected to Ledger");
        }
        const signature = await (0, core_1.signTransaction)(this._transport, transaction, this._derivationPath);
        transaction.addSignature(this._publicKey, signature);
        return transaction;
    }
    async connect(args) {
        if (this._connecting) {
            return;
        }
        this._connecting = true;
        try {
            // @TODO: transport selection (WebUSB, WebHID, bluetooth, ...)
            this._transport = await hw_transport_webusb_1.default.create();
            if (args) {
                const { account, change } = args;
                this._derivationPath = (0, core_1.getSolanaDerivationPath)(account, change);
                this._publicKey = await (0, core_1.getPublicKey)(this._transport, this._derivationPath);
            }
            else {
                this._publicKey = await (0, core_1.getPublicKey)(this._transport);
            }
            this.emit("connect", this._publicKey);
        }
        catch (error) {
            await this.disconnect();
            throw new LedgerError(error);
        }
        finally {
            this._connecting = false;
        }
    }
    async disconnect() {
        let emit = false;
        if (this._transport) {
            await this._transport.close();
            this._transport = null;
            emit = true;
        }
        this._connecting = false;
        this._publicKey = null;
        if (emit) {
            this.emit("disconnect");
        }
    }
    /**
     * Ledger transport.
     */
    get transport() {
        return this._transport;
    }
    /**
     * Fetches accounts associated with the given derivation paths.
     *
     * @param paths
     * @returns
     */
    static async fetchAccountsForPaths(paths) {
        let transport = null;
        try {
            transport = await hw_transport_webusb_1.default.create();
            const ret = [];
            for (const path of paths) {
                const derivationPath = (0, core_1.getSolanaDerivationPath)(path.account, path.change);
                ret.push({
                    ...path,
                    key: await (0, core_1.getPublicKey)(transport, derivationPath),
                });
            }
            return ret;
        }
        catch (error) {
            throw new LedgerError(error);
        }
        finally {
            await (transport === null || transport === void 0 ? void 0 : transport.close());
        }
    }
}
exports.LedgerWalletAdapter = LedgerWalletAdapter;
class LedgerError extends Error {
    constructor(error) {
        super(`Ledger Error: ${error.message}`);
        this.name = "LedgerError";
    }
}
exports.LedgerError = LedgerError;
//# sourceMappingURL=index.js.map