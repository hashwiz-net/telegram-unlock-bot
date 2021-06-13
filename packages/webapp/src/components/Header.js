import React from 'react'
import useWeb3Wallet from '../utils/useWeb3Wallet'
import Button from './basic/Button'
import ETHAddress from './basic/ETHAddress'
import Title from './basic/Title'

import { useRouteMatch, Link } from 'react-router-dom'

const Header = () => {
  const { wallet } = useWeb3Wallet()

  const match = useRouteMatch('/')

  return (
    <div className="container flex items-center py-5 border-b border-gray-200 mb-5 px-3">
      {!match || match.isExact ? null : (
        <Link to="/" className="mr-3">&larr;</Link>
      )}
      <Title className="text-xl mb-0">Telegram Unlock Bot</Title>
      <div className="ml-auto flex items-center">
        <ETHAddress address={wallet.account} />
        <Button 
          className="bg-red-400 hover:bg-red-500 py-1 px-3 text-sm md:min-w-0 ml-3 mt-0 rounded-2xl"
          onClick={() => wallet.reset()}
        >Disconnect</Button>
      </div>
    </div>
  )
}

export default Header
