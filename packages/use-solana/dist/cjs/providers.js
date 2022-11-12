"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_WALLET_PROVIDERS = exports.DefaultWalletType = void 0;
const wallet_adapter_icons_1 = require("@saberhq/wallet-adapter-icons");
const wallet_adapter_brave_1 = require("@solana/wallet-adapter-brave");
const wallet_adapter_clover_1 = require("@solana/wallet-adapter-clover");
const wallet_adapter_coin98_1 = require("@solana/wallet-adapter-coin98");
const wallet_adapter_coinbase_1 = require("@solana/wallet-adapter-coinbase");
const wallet_adapter_exodus_1 = require("@solana/wallet-adapter-exodus");
const wallet_adapter_glow_1 = require("@solana/wallet-adapter-glow");
const wallet_adapter_huobi_1 = require("@solana/wallet-adapter-huobi");
const wallet_adapter_mathwallet_1 = require("@solana/wallet-adapter-mathwallet");
const wallet_adapter_nightly_1 = require("@solana/wallet-adapter-nightly");
const wallet_adapter_phantom_1 = require("@solana/wallet-adapter-phantom");
const wallet_adapter_slope_1 = require("@solana/wallet-adapter-slope");
const wallet_adapter_solflare_1 = require("@solana/wallet-adapter-solflare");
const wallet_adapter_sollet_1 = require("@solana/wallet-adapter-sollet");
const wallet_adapter_solong_1 = require("@solana/wallet-adapter-solong");
const wallet_adapter_walletconnect_1 = require("@solana/wallet-adapter-walletconnect");
const adapters_1 = require("./adapters");
const readonly_1 = require("./adapters/readonly");
const secret_key_1 = require("./adapters/secret-key");
var DefaultWalletType;
(function (DefaultWalletType) {
    DefaultWalletType["BraveWallet"] = "BraveWallet";
    DefaultWalletType["Clover"] = "Clover";
    DefaultWalletType["Coin98"] = "Coin98";
    DefaultWalletType["CoinbaseWallet"] = "CoinbaseWallet";
    DefaultWalletType["Exodus"] = "Exodus";
    DefaultWalletType["Glow"] = "Glow";
    DefaultWalletType["Huobi"] = "Huobi";
    DefaultWalletType["Ledger"] = "Ledger";
    DefaultWalletType["MathWallet"] = "MathWallet";
    DefaultWalletType["Nightly"] = "Nightly";
    DefaultWalletType["Phantom"] = "Phantom";
    DefaultWalletType["ReadOnly"] = "ReadOnly";
    DefaultWalletType["SecretKey"] = "SecretKey";
    DefaultWalletType["Slope"] = "Slope";
    DefaultWalletType["Solflare"] = "Solflare";
    DefaultWalletType["Sollet"] = "Sollet";
    DefaultWalletType["SolletExtension"] = "SolletExtension";
    DefaultWalletType["Solong"] = "Solong";
    DefaultWalletType["WalletConnect"] = "WalletConnect";
})(DefaultWalletType = exports.DefaultWalletType || (exports.DefaultWalletType = {}));
exports.DEFAULT_WALLET_PROVIDERS = {
    [DefaultWalletType.Sollet]: {
        name: "Sollet",
        url: "https://www.sollet.io",
        icon: wallet_adapter_icons_1.SOLLET,
        makeAdapter: (provider, network) => new adapters_1.SolanaWalletAdapter(new wallet_adapter_sollet_1.SolletWalletAdapter({
            provider,
            network: network,
        })),
        isMobile: true,
    },
    [DefaultWalletType.SolletExtension]: {
        name: "Sollet (Extension)",
        url: "https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno",
        icon: wallet_adapter_icons_1.SOLLET,
        makeAdapter: (_provider, network) => new adapters_1.SolanaWalletAdapter(new wallet_adapter_sollet_1.SolletExtensionWalletAdapter({
            network: network,
        })),
        isInstalled: () => window.sollet !== undefined,
    },
    [DefaultWalletType.WalletConnect]: {
        name: "WalletConnect",
        url: "https://walletconnect.com/",
        icon: wallet_adapter_icons_1.WALLETCONNECT,
        makeAdapter: (_provider, network, options) => {
            if (!options) {
                throw new Error("WalletConnect options not provided");
            }
            return new adapters_1.SolanaWalletAdapter(new wallet_adapter_walletconnect_1.WalletConnectWalletAdapter({
                network: network,
                options: options["options"],
            }));
        },
    },
    [DefaultWalletType.BraveWallet]: {
        name: "Brave Wallet",
        url: "https://www.brave.com/wallet",
        icon: wallet_adapter_icons_1.BRAVEWALLET,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_brave_1.BraveWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.braveSolana) === null || _a === void 0 ? void 0 : _a.isBraveWallet) === true; },
        isMobile: true,
    },
    [DefaultWalletType.Ledger]: {
        name: "Ledger",
        url: "https://www.ledger.com",
        icon: wallet_adapter_icons_1.LEDGER,
        makeAdapter: () => new adapters_1.LedgerWalletAdapter(),
    },
    [DefaultWalletType.Solong]: {
        name: "Solong",
        url: "https://solongwallet.com/",
        icon: "https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/solong.png",
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_solong_1.SolongWalletAdapter()),
        isInstalled: () => window.solong !== undefined,
    },
    [DefaultWalletType.Exodus]: {
        name: "Exodus",
        url: "https://www.exodus.com/browser-extension",
        icon: wallet_adapter_icons_1.EXODUS,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_exodus_1.ExodusWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.exodus) === null || _a === void 0 ? void 0 : _a.solana) !== undefined; },
        isMobile: true,
    },
    [DefaultWalletType.Glow]: {
        name: "Glow",
        url: "https://www.glow.app",
        icon: wallet_adapter_icons_1.GLOW,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_glow_1.GlowWalletAdapter()),
        isInstalled: () => Boolean(window.glowSolana),
        isMobile: true,
    },
    [DefaultWalletType.Phantom]: {
        name: "Phantom",
        url: "https://www.phantom.app",
        icon: wallet_adapter_icons_1.PHANTOM,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_phantom_1.PhantomWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isPhantom) === true; },
        isMobile: true,
    },
    [DefaultWalletType.MathWallet]: {
        name: "MathWallet",
        url: "https://www.mathwallet.org",
        icon: wallet_adapter_icons_1.MATHWALLET,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_mathwallet_1.MathWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isMathWallet) === true; },
        isMobile: true,
    },
    [DefaultWalletType.Coin98]: {
        name: "Coin98",
        url: "https://wallet.coin98.com/",
        icon: wallet_adapter_icons_1.COIN98,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_coin98_1.Coin98WalletAdapter()),
        isInstalled: () => window.coin98 !== undefined,
        isMobile: true,
    },
    [DefaultWalletType.CoinbaseWallet]: {
        name: "Coinbase Wallet",
        url: "https://www.coinbase.com/wallet",
        icon: wallet_adapter_icons_1.COINBASE_WALLET,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_coinbase_1.CoinbaseWalletAdapter()),
        isInstalled: () => window.coinbaseSolana !== undefined,
        isMobile: true,
    },
    [DefaultWalletType.Clover]: {
        name: "Clover",
        url: "https://clover.finance",
        icon: wallet_adapter_icons_1.CLOVER,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_clover_1.CloverWalletAdapter()),
        isInstalled: () => window.clover_solana !== undefined,
    },
    [DefaultWalletType.SecretKey]: {
        name: "Secret Key",
        url: "https://solana.com/",
        icon: wallet_adapter_icons_1.FILE,
        makeAdapter: () => new secret_key_1.SecretKeyAdapter(),
    },
    [DefaultWalletType.Solflare]: {
        name: "Solflare",
        url: "https://solflare.com/",
        icon: wallet_adapter_icons_1.SOLFLARE,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_solflare_1.SolflareWalletAdapter()),
        isMobile: true,
    },
    [DefaultWalletType.Slope]: {
        name: "Slope",
        url: "https://www.slope.finance/",
        icon: wallet_adapter_icons_1.SLOPE,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_slope_1.SlopeWalletAdapter()),
        isInstalled: () => window.Slope !== undefined,
        isMobile: true,
    },
    [DefaultWalletType.Huobi]: {
        name: "HuobiWallet",
        url: "https://www.huobiwallet.io",
        icon: wallet_adapter_icons_1.HUOBI,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_huobi_1.HuobiWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.huobiWallet) === null || _a === void 0 ? void 0 : _a.isHuobiWallet) === true; },
        isMobile: true,
    },
    [DefaultWalletType.ReadOnly]: {
        name: "Debug",
        url: "https://github.com/saber-hq/saber-common",
        icon: wallet_adapter_icons_1.MAGNIFYING_GLASS,
        makeAdapter: () => new readonly_1.ReadonlyAdapter(),
        isInstalled: () => !!process.env.LOCAL_PUBKEY || !!process.env.REACT_APP_LOCAL_PUBKEY,
    },
    [DefaultWalletType.Nightly]: {
        name: "Nightly",
        url: "https://nightly.app",
        icon: wallet_adapter_icons_1.NIGHTLY,
        makeAdapter: () => new adapters_1.SolanaWalletAdapter(new wallet_adapter_nightly_1.NightlyWalletAdapter()),
        isInstalled: () => { var _a; return typeof ((_a = window === null || window === void 0 ? void 0 : window.nightly) === null || _a === void 0 ? void 0 : _a.solana) !== "undefined"; },
    },
};
//# sourceMappingURL=providers.js.map