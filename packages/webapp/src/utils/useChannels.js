import { useEffect, useState } from 'react'
import useWeb3Wallet from './useWeb3Wallet'

const useChannels = () => {
  const { wallet, isConnected, chainId } = useWeb3Wallet()
  const [channels, setChannels] = useState(true)
  const [loading, setLoading] = useState(true)
  const [reloadCounter, setReload] = useState(0)

  useEffect(() => {
    if (!isConnected) return

    const go = async () => {
      const resp = await fetch(`/api/channels/${chainId}?walletAddress=${wallet.account}`)
      const body = await resp.json()

      setChannels(body.channels)
      setLoading(false)
    }
    go()
  }, [isConnected, wallet.account, chainId, reloadCounter])

  return {
    channels,
    reload: () => setReload(Date.now()),
    loading
  }
}

export default useChannels
