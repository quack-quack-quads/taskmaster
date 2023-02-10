const networkConfig = {
    default: {
        name: 'hardhat',
    },
    31337:{
        name: "localhost",
    },
    5: {
        name: "goerli",
    },
    1: {
        name: "mainnet",
    }
}
const nameToChainId = {
    hardhat: 31337,
    localhost: 31337,
    goerli: 5,
    mainnet: 1,
}
const developmentChains = ["hardhat", "localhost"];
const VERIFICATION_BLOCK_CONFIRMATIONS = 6;
module.exports = {
    // export abi 
    networkConfig,
    nameToChainId,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
}