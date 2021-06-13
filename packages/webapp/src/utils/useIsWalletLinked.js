import { useEffect, useState } from 'react'
import useWeb3Wallet from './useWeb3Wallet'

const useIsWalletLinked = () => {
  const { wallet, isConnected } = useWeb3Wallet()
  const [linked, setLinked] = useState(true)
  const [loading, setLoading] = useState(true)
  const [reloadCounter, setReload] = useState(0)

  useEffect(() => {
    if (!isConnected) return

    const go = async () => {
      const resp = await fetch(`/api/users/wallet-status?walletAddress=${wallet.account}`)
      const body = await resp.json()

      setLinked(body.walletLinked)
      setLoading(false)
    }
    go()
  }, [isConnected, wallet.account, reloadCounter])

  return {
    linked,
    reload: () => setReload(Date.now()),
    loading
  }
}

export default useIsWalletLinked
