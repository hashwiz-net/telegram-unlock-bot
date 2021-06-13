import { useEffect, useState } from 'react'
import useWallet from './useWallet'

const useChannels = () => {
  const { address, active, chainId } = useWallet()
  const [channels, setChannels] = useState(true)
  const [loading, setLoading] = useState(true)
  const [reloadCounter, setReload] = useState(0)

  useEffect(() => {
    if (!active) return

    const go = async () => {
      const resp = await fetch(`/api/channels/${chainId}/${address}`)
      const body = await resp.json()

      setChannels(body.channels)
      setLoading(false)
    }
    go()
  }, [active, address, chainId, reloadCounter])

  return {
    channels,
    reload: () => setReload(Date.now()),
    loading
  }
}

export default useChannels
