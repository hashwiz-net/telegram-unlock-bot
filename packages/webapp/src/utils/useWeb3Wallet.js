import { useMemo } from 'react'

import { useWallet } from 'use-wallet'
import { ethers } from 'ethers'

const useWeb3Wallet = () => {
  const wallet = useWallet()

  const { provider, signer } = useMemo(() => {
    if (!wallet.ethereum) {
      return {}
    }

    const provider = new ethers.providers.Web3Provider(wallet.ethereum)
    const signer = provider.getSigner()

    return {
      provider,
      signer
    }
  }, [wallet.status])

  return {
    provider,
    signer,
    wallet,
    chainId: wallet && wallet.chainId,
    isConnected: Boolean(wallet && wallet.status === 'connected')
  }
}

export default useWeb3Wallet
