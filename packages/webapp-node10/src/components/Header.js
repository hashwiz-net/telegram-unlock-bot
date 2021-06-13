import React from 'react'
import useWallet from '../utils/useWallet'
import Button from './basic/Button'
import ETHAddress from './basic/ETHAddress'
import Title from './basic/Title'

const Header = () => {
  const wallet = useWallet()

  return (
    <div className="container d-flex align-items-center py-3 mb-3 px-3 topbar">
      <Title className="h4 mb-0">Telegram Unlock Bot</Title>
      <div className="topbar-right-section">
        <ETHAddress address={wallet.address} />
        <Button 
          className="btn-danger btn-sm"
          onClick={() => wallet.reset()}
        >Disconnect</Button>
      </div>
    </div>
  )
}

export default Header
