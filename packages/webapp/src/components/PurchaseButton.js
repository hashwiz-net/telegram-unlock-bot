import React, { useState } from 'react'

import { WalletService } from '@unlock-protocol/unlock-js'

import useWeb3Wallet from '../utils/useWeb3Wallet'
import Button from './basic/Button'

const networks = {
  1: {
    provider: `https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    unlockAddress: '0x3d5409cce1d45233de1d4ebdee74b8e004abdd13',
  },
  4: {
    provider: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
    unlockAddress: '0xd8c88be5e8eb88e38e6ff5ce186d764676012b0b',
  },
}

const PurchaseButton = ({ className, children, lockAddress, afterPurchase }) => {
  const { provider, signer } = useWeb3Wallet()
  const [error, setError] = useState('')
  const [purchasing, setPurchasing] = useState(false)

  const purchaseKey = async () => {
    setPurchasing(true)
    setError(null)

    try {
      const walletService = new WalletService(networks)
  
      await walletService.connect(provider, signer)
  
      await walletService.purchaseKey({
        lockAddress,
        referrer: '0x39d0A0C17fB254090cA7c5b254F00550eFD01716'
      })

      if (afterPurchase) {
        afterPurchase()
      }
    } catch (err) {
      console.error(err)
      setError('Something went wrong')
    } finally {
      setPurchasing(false)
    }
  }

  return (
    <Button className={className || 'py-1 px-3 text-sm md:min-w-0 my-0 mx-2'} onClick={purchaseKey}>
      {purchasing ? 'Unlocking...' : (children || 'Unlock')}
    </Button>
  )
}

export default PurchaseButton
