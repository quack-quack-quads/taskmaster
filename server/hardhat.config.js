require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy");
require("solidity-coverage");
// require("hardhat-gas-reporter") 
require("hardhat-change-network");
require("hardhat-contract-sizer")
require("dotenv").config()
module.exports = {
  solidity: {
    compilers: [
          {
              version: "0.8.9",
              settings: {
                  optimizer: {
                    enabled: true,
                    runs: 200,
                  }
              }
          },
    ]
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      blockConfirmations: 1
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    goerli: {
      url: process.env.ALCHEMY_TESTNET_LINK_GOERLI,
      accounts: [process.env.METAMASK_PRIVATE_KEY_FOR_TESTNET],
      chainId: 5,
      blockConfirmations: 5
    },
    polygon_mumbai: {
      url: process.env.QUICKNODE_TESTNET_LINK_POLYGON,
      accounts: [process.env.METAMASK_PRIVATE_KEY_FOR_TESTNET],
      chainId: 80001,
      blockConfirmations: 5
    }
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    }
  },
  // ! api key for verfifying contracts on polygon
  etherscan: {
    apiKey: process.env.NETWORK_NAME === "polygon_mumbai" ? process.env.POLYGONSCAN_API_KEY : process.env.ETHERSCAN_API_KEY
  }
};