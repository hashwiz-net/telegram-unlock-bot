import { useEffect, useState } from 'react'
import useWallet from './useWallet'

const useIsWalletLinked = () => {
  const { address, active } = useWallet()
  const [linked, setLinked] = useState(true)
  const [loading, setLoading] = useState(true)
  const [reloadCounter, setReload] = useState(0)

  useEffect(() => {
    if (!active) return

    const go = async () => {
      const resp = await fetch(`/api/users/wallet-status?walletAddress=${address}`)
      const body = await resp.json()

      setLinked(body.walletLinked)
      setLoading(false)
    }
    go()
  }, [active, address, reloadCounter])

  return {
    linked,
    reload: () => setReload(Date.now()),
    loading
  }
}

export default useIsWalletLinked
