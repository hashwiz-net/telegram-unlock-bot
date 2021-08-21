const ethers = require('ethers')

const defaultInfuraConfig = {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET
}

const networks = [
  {
    name: 'Rinkeby',
    networdId: 4,
    provider: new ethers.providers.InfuraProvider(4, defaultInfuraConfig)
  },
  {
    name: 'Mainnet',
    networdId: 1,
    provider: new ethers.providers.InfuraProvider(1, defaultInfuraConfig)
  }
]

module.exports = networks
