import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useEffect } from 'react'
import { useState } from 'react'

export const injected = new InjectedConnector({ supportedChainIds: [1, 4] })

const useWallet = () => {
  const { activate, error, active, account, chainId, deactivate, library } = useWeb3React()

  const [loading, setLoading] = useState(false)

  return {
    loading,
    connect: async () => {
      setLoading(true)
      await activate(injected)
    },
    reset: deactivate,
    error,
    active, 
    address: account, 
    provider: library,
    signer: active ? library.getSigner(account) : library,
    chainId,
    connector: injected
  }
}

export default useWallet
