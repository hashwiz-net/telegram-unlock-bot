import { Web3ReactProvider } from '@web3-react/core'
import { ethers, providers } from 'ethers'
import React from 'react'
import ConnectWallet from './pages/ConnectWallet'
import Dashboard from './pages/Dashboard'
import useEagerConnect from './utils/useEagerConnect'
import useWallet from './utils/useWallet'

function App() {
  useEagerConnect()

  const { active, connect, account } = useWallet()

  if (!active) {
    return <ConnectWallet />
  }

  return (
    <Dashboard />
  )
}

const Providers = () => {
  return (
    <Web3ReactProvider getLibrary={(provider) => {
      return new providers.Web3Provider(provider)
    }}>
      <App />
    </Web3ReactProvider>
  )
}

export default Providers
