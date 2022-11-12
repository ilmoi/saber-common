import type * as React from "react";
import type { WalletAdapterBuilder } from "./adapters";
export declare enum DefaultWalletType {
    BraveWallet = "BraveWallet",
    Clover = "Clover",
    Coin98 = "Coin98",
    CoinbaseWallet = "CoinbaseWallet",
    Exodus = "Exodus",
    Glow = "Glow",
    Huobi = "Huobi",
    Ledger = "Ledger",
    MathWallet = "MathWallet",
    Nightly = "Nightly",
    Phantom = "Phantom",
    ReadOnly = "ReadOnly",
    SecretKey = "SecretKey",
    Slope = "Slope",
    Solflare = "Solflare",
    Sollet = "Sollet",
    SolletExtension = "SolletExtension",
    Solong = "Solong",
    WalletConnect = "WalletConnect"
}
export declare type WalletTypeEnum<T> = {
    [name: string]: T[keyof T] | string;
};
export declare type UnknownWalletType = WalletTypeEnum<Record<string, unknown>>;
export declare type WalletProviderMap<WalletType extends WalletTypeEnum<WalletType>> = {
    [W in keyof WalletType]: WalletProviderInfo;
};
export declare const DEFAULT_WALLET_PROVIDERS: WalletProviderMap<typeof DefaultWalletType>;
export interface WalletProviderInfo {
    /**
     * Name of the wallet provider.
     */
    readonly name: string;
    /**
     * URL of the wallet provider.
     */
    readonly url: string;
    icon: string | React.FC<React.SVGProps<SVGSVGElement>>;
    makeAdapter: WalletAdapterBuilder;
    isInstalled?: () => boolean;
    isMobile?: boolean;
}
//# sourceMappingURL=providers.d.ts.map