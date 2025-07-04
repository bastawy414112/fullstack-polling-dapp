require("@nomicfoundation/hardhat-ethers");
require("@matterlabs/hardhat-zksync-solc");


module.exports = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    zkSyncLocal: {
      url: "http://127.0.0.1:3050", // zkSync Local node URL (L2)
      ethNetwork: "http://127.0.0.1:8545", // Ethereum Local node URL (L1)
      zksync: true,
    },
  },
};
