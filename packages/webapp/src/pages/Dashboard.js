import React from 'react'
import Text from '../components/basic/Text'
import useIsWalletLinked from '../utils/useIsWalletLinked'
import Channels from './Channels'
import LinkWallet from './LinkWallet'

const Dashboard = () => {
  const { linked, loading, reload } = useIsWalletLinked()

  return (
    <>
      {loading 
        ? <Text className="my-3">Loading...</Text> 
        : linked ? <Channels /> : <LinkWallet reloadStatus={reload} />}
    </>
  )
}

export default Dashboard
