import React from 'react'

import Text from './Text'

const ETHAddress = ({ address }) => {
  if (!address) return null

  return (
    <div className="eth-address" title={address}>
      <Text className="mb-0">{address.substr(0, 6)}...{address.substr(-4)}</Text>
    </div>
  )
}

export default ETHAddress
