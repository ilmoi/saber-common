import { BRAVEWALLET, CLOVER, COIN98, COINBASE_WALLET, EXODUS, FILE, GLOW, HUOBI, LEDGER, MAGNIFYING_GLASS, MATHWALLET, NIGHTLY, PHANTOM, SLOPE, SOLFLARE, SOLLET, WALLETCONNECT, } from "@saberhq/wallet-adapter-icons";
import { BraveWalletAdapter } from "@solana/wallet-adapter-brave";
import { CloverWalletAdapter } from "@solana/wallet-adapter-clover";
import { Coin98WalletAdapter } from "@solana/wallet-adapter-coin98";
import { CoinbaseWalletAdapter } from "@solana/wallet-adapter-coinbase";
import { ExodusWalletAdapter } from "@solana/wallet-adapter-exodus";
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow";
import { HuobiWalletAdapter } from "@solana/wallet-adapter-huobi";
import { MathWalletAdapter } from "@solana/wallet-adapter-mathwallet";
import { NightlyWalletAdapter } from "@solana/wallet-adapter-nightly";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SlopeWalletAdapter } from "@solana/wallet-adapter-slope";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { SolletExtensionWalletAdapter, SolletWalletAdapter, } from "@solana/wallet-adapter-sollet";
import { SolongWalletAdapter } from "@solana/wallet-adapter-solong";
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect";
import { LedgerWalletAdapter, SolanaWalletAdapter } from "./adapters";
import { ReadonlyAdapter } from "./adapters/readonly";
import { SecretKeyAdapter } from "./adapters/secret-key";
export var DefaultWalletType;
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
})(DefaultWalletType || (DefaultWalletType = {}));
export const DEFAULT_WALLET_PROVIDERS = {
    [DefaultWalletType.Sollet]: {
        name: "Sollet",
        url: "https://www.sollet.io",
        icon: SOLLET,
        makeAdapter: (provider, network) => new SolanaWalletAdapter(new SolletWalletAdapter({
            provider,
            network: network,
        })),
        isMobile: true,
    },
    [DefaultWalletType.SolletExtension]: {
        name: "Sollet (Extension)",
        url: "https://chrome.google.com/webstore/detail/sollet/fhmfendgdocmcbmfikdcogofphimnkno",
        icon: SOLLET,
        makeAdapter: (_provider, network) => new SolanaWalletAdapter(new SolletExtensionWalletAdapter({
            network: network,
        })),
        isInstalled: () => window.sollet !== undefined,
    },
    [DefaultWalletType.WalletConnect]: {
        name: "WalletConnect",
        url: "https://walletconnect.com/",
        icon: WALLETCONNECT,
        makeAdapter: (_provider, network, options) => {
            if (!options) {
                throw new Error("WalletConnect options not provided");
            }
            return new SolanaWalletAdapter(new WalletConnectWalletAdapter({
                network: network,
                options: options["options"],
            }));
        },
    },
    [DefaultWalletType.BraveWallet]: {
        name: "Brave Wallet",
        url: "https://www.brave.com/wallet",
        icon: BRAVEWALLET,
        makeAdapter: () => new SolanaWalletAdapter(new BraveWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.braveSolana) === null || _a === void 0 ? void 0 : _a.isBraveWallet) === true; },
        isMobile: true,
    },
    [DefaultWalletType.Ledger]: {
        name: "Ledger",
        url: "https://www.ledger.com",
        icon: LEDGER,
        makeAdapter: () => new LedgerWalletAdapter(),
    },
    [DefaultWalletType.Solong]: {
        name: "Solong",
        url: "https://solongwallet.com/",
        icon: "https://raw.githubusercontent.com/solana-labs/oyster/main/assets/wallets/solong.png",
        makeAdapter: () => new SolanaWalletAdapter(new SolongWalletAdapter()),
        isInstalled: () => window.solong !== undefined,
    },
    [DefaultWalletType.Exodus]: {
        name: "Exodus",
        url: "https://www.exodus.com/browser-extension",
        icon: EXODUS,
        makeAdapter: () => new SolanaWalletAdapter(new ExodusWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.exodus) === null || _a === void 0 ? void 0 : _a.solana) !== undefined; },
        isMobile: true,
    },
    [DefaultWalletType.Glow]: {
        name: "Glow",
        url: "https://www.glow.app",
        icon: GLOW,
        makeAdapter: () => new SolanaWalletAdapter(new GlowWalletAdapter()),
        isInstalled: () => Boolean(window.glowSolana),
        isMobile: true,
    },
    [DefaultWalletType.Phantom]: {
        name: "Phantom",
        url: "https://www.phantom.app",
        icon: PHANTOM,
        makeAdapter: () => new SolanaWalletAdapter(new PhantomWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isPhantom) === true; },
        isMobile: true,
    },
    [DefaultWalletType.MathWallet]: {
        name: "MathWallet",
        url: "https://www.mathwallet.org",
        icon: MATHWALLET,
        makeAdapter: () => new SolanaWalletAdapter(new MathWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.solana) === null || _a === void 0 ? void 0 : _a.isMathWallet) === true; },
        isMobile: true,
    },
    [DefaultWalletType.Coin98]: {
        name: "Coin98",
        url: "https://wallet.coin98.com/",
        icon: COIN98,
        makeAdapter: () => new SolanaWalletAdapter(new Coin98WalletAdapter()),
        isInstalled: () => window.coin98 !== undefined,
        isMobile: true,
    },
    [DefaultWalletType.CoinbaseWallet]: {
        name: "Coinbase Wallet",
        url: "https://www.coinbase.com/wallet",
        icon: COINBASE_WALLET,
        makeAdapter: () => new SolanaWalletAdapter(new CoinbaseWalletAdapter()),
        isInstalled: () => window.coinbaseSolana !== undefined,
        isMobile: true,
    },
    [DefaultWalletType.Clover]: {
        name: "Clover",
        url: "https://clover.finance",
        icon: CLOVER,
        makeAdapter: () => new SolanaWalletAdapter(new CloverWalletAdapter()),
        isInstalled: () => window.clover_solana !== undefined,
    },
    [DefaultWalletType.SecretKey]: {
        name: "Secret Key",
        url: "https://solana.com/",
        icon: FILE,
        makeAdapter: () => new SecretKeyAdapter(),
    },
    [DefaultWalletType.Solflare]: {
        name: "Solflare",
        url: "https://solflare.com/",
        icon: SOLFLARE,
        makeAdapter: () => new SolanaWalletAdapter(new SolflareWalletAdapter()),
        isMobile: true,
    },
    [DefaultWalletType.Slope]: {
        name: "Slope",
        url: "https://www.slope.finance/",
        icon: SLOPE,
        makeAdapter: () => new SolanaWalletAdapter(new SlopeWalletAdapter()),
        isInstalled: () => window.Slope !== undefined,
        isMobile: true,
    },
    [DefaultWalletType.Huobi]: {
        name: "HuobiWallet",
        url: "https://www.huobiwallet.io",
        icon: HUOBI,
        makeAdapter: () => new SolanaWalletAdapter(new HuobiWalletAdapter()),
        isInstalled: () => { var _a; return ((_a = window.huobiWallet) === null || _a === void 0 ? void 0 : _a.isHuobiWallet) === true; },
        isMobile: true,
    },
    [DefaultWalletType.ReadOnly]: {
        name: "Debug",
        url: "https://github.com/saber-hq/saber-common",
        icon: MAGNIFYING_GLASS,
        makeAdapter: () => new ReadonlyAdapter(),
        isInstalled: () => !!process.env.LOCAL_PUBKEY || !!process.env.REACT_APP_LOCAL_PUBKEY,
    },
    [DefaultWalletType.Nightly]: {
        name: "Nightly",
        url: "https://nightly.app",
        icon: NIGHTLY,
        makeAdapter: () => new SolanaWalletAdapter(new NightlyWalletAdapter()),
        isInstalled: () => { var _a; return typeof ((_a = window === null || window === void 0 ? void 0 : window.nightly) === null || _a === void 0 ? void 0 : _a.solana) !== "undefined"; },
    },
};
//# sourceMappingURL=providers.js.map