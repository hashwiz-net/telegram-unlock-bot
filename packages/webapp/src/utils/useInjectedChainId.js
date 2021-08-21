import { useEffect, useState } from 'react'

const useInjectedChainId = () => {
  const [chainId, setChainId] = useState()

  useEffect(() => {
    const intr = setInterval(() => {
      // Note: This will not work for all chain IDs
      const networkHex = window.web3 ? window.web3.currentProvider.chainId : '0x'

      setChainId(parseInt(networkHex.slice(2)) || 1)
    }, 500)

    return () => {
      clearInterval(intr)
    }
  }, [])

  return chainId
}

export default useInjectedChainId
