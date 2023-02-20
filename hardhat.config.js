require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "wandev",
  networks: {
    wandev: {
      url: `wss://apitest.wanchain.org:8443/ws/v3/${process.env.WAN_API_KEY}`,
      chainId: 999,
      accounts: [process.env.WANDEV_KEY]
    },
    wancash: {
      url: `wss://api.wanchain.org:8443/ws/v3/${process.env.WAN_API_KEY}`,
      accounts: [process.env.WANDEV_KEY]
    },
    wandev2: {
      url: `https://gwan-ssl.wandevs.org:46891`,
      chainId: 999,
      gasPrice: 20000000000,
      accounts: [process.env.WANDEV_KEY]
    },
    wancash2: {
      url: `https://gwan-ssl.wandevs.org:56891`,
      chainId: 888,
      gasPrice: 20000000000,
      accounts: [process.env.WANDEV_KEY]
    },
    bscdev: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      // accounts: { mnemonic: mnemonic }
      accounts: [process.env.WANDEV_KEY]
    },
    bscmain: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      // accounts: { mnemonic: mnemonic }
      accounts: [process.env.WANDEV_KEY]
    }
  }
};

