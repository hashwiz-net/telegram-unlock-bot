import { useEffect, useState } from 'react'

import { get } from 'lodash'

const useInjectedChainId = () => {
  const [chainId, setChainId] = useState(1)

  useEffect(() => {
    const intr = setInterval(() => {
      // Note: This will not work for all chain IDs
      const networkHex = get(window, 'web3.currentProvider.chainId', '0x1')

      setChainId(parseInt(networkHex.slice(2)) || 1)
    }, 1000)

    return () => {
      clearInterval(intr)
    }
  }, [])

  return chainId
}

export default useInjectedChainId
