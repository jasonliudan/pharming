const connectionConfig = require('frg-ethereum-runners/config/network_config.json');
const HDWalletProvider = require('truffle-hdwallet-provider');

require('dotenv').config();

module.exports = {
  networks: {
    ganacheUnitTest: connectionConfig.ganacheUnitTest,
    gethUnitTest: connectionConfig.gethUnitTest,
    testrpcCoverage: connectionConfig.testrpcCoverage,
    ropsten: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`),
      network_id: 3,
      gasPrice: 1000000000
    },
    kovan: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://kovan.infura.io/v3/${process.env.INFURA_ID}`),
      network_id: 42,
      gasPrice: 1000000000
    },
    mainnet: {
      network_id: 1,
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`),
      gasPrice: 78000000000
    }
  },
  mocha: {
    enableTimeouts: false,
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      currency: 'USD'
    }
  },
  compilers: {
    solc: {
      version: '0.5.16'
    }
  }
};
