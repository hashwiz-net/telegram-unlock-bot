import { useEffect, useState } from 'react'
import useWeb3Wallet from './useWeb3Wallet'

const useChannel = (channelId) => {
  const { wallet, isConnected, chainId } = useWeb3Wallet()
  const [channel, setChannel] = useState(true)
  const [loading, setLoading] = useState(true)
  const [reloadCounter, setReload] = useState(0)

  useEffect(() => {
    if (!isConnected) return

    const go = async () => {
      const resp = await fetch(`/api/channels/${chainId}/${channelId}?walletAddress=${wallet.account}`)
      const body = await resp.json()

      setChannel(body.channel)
      setLoading(false)
    }
    go()
  }, [isConnected, wallet.account, chainId, reloadCounter])

  return {
    channel,
    reload: () => setReload(Date.now()),
    loading
  }
}

export default useChannel
