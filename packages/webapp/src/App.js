import React from 'react'
import { UseWalletProvider } from 'use-wallet'

import { Route, HashRouter } from 'react-router-dom'

import ConnectWallet from './pages/ConnectWallet'
import ChannelDetail from './pages/ChannelDetail'
import Dashboard from './pages/Dashboard'

import Header from './components/Header'

import './tailwind.css'
import useWeb3Wallet from './utils/useWeb3Wallet'
import useInjectedChainId from './utils/useInjectedChainId'

const Providers = () => {
  const chainId = useInjectedChainId()

  return (
    <UseWalletProvider
      chainId={chainId}
    >
      <HashRouter>
        <App />
      </HashRouter>
    </UseWalletProvider>
  )
}

const App = () => {
  const { isConnected } = useWeb3Wallet()

  if (!isConnected) {
    return <ConnectWallet />
  }

  return (
    <>
      <Header />
      <Route path="/channel/:channelId" component={ChannelDetail} />
      <Route path="/" exact component={Dashboard} />
    </>
  )
}

export default Providers
