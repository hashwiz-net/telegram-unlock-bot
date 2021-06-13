import React, { useState } from 'react'

import { WalletService } from '@unlock-protocol/unlock-js'

import Button from './basic/Button'

import useWallet from '../utils/useWallet'

const networks = {
  4: {
    provider: 'https://rinkeby.infura.io/v3/86c1641a6ce84463aa05b081494336d8',
    unlockAddress: '0xd8c88be5e8eb88e38e6ff5ce186d764676012b0b',
  },
}

const PurchaseButton = ({ children, lockAddress, afterPurchase }) => {
  const wallet = useWallet()

  const [error, setError] = useState('')
  const [purchasing, setPurchasing] = useState(false)

  const purchaseKey = async () => {
    setPurchasing(true)
    setError(null)

    try {
      const walletService = new WalletService(networks)
  
      await walletService.connect(wallet.provider, wallet.signer)
  
      await walletService.purchaseKey({
        lockAddress
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
    <Button className="btn-sm my-0 mx-2" onClick={purchaseKey} disabled={purchasing}>
      {purchasing ? 'Unlocking...' : (children || 'Unlock')}
    </Button>
  )
}

export default PurchaseButton
