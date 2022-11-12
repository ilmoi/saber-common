/**
 * Formats the network as a string.
 * @param network
 * @returns
 */
export const formatNetwork = (network) => {
    if (network === "mainnet-beta") {
        return "mainnet";
    }
    return network;
};
/**
 * Default configuration for all networks.
 */
export const DEFAULT_NETWORK_CONFIG_MAP = {
    "mainnet-beta": {
        name: "Mainnet Beta",
        endpoint: "https://solana-api.projectserum.com/",
    },
    devnet: {
        name: "Devnet",
        endpoint: "https://api.devnet.solana.com/",
    },
    testnet: {
        name: "Testnet",
        endpoint: "https://api.testnet.solana.com/",
    },
    localnet: {
        name: "Localnet",
        endpoint: "http://127.0.0.1:8899",
    },
};
//# sourceMappingURL=constants.js.map