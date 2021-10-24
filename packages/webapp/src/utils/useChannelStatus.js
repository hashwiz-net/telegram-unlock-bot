import { useMemo } from 'react'

export const ChannelStatuses = {
  Inactive: 'Inactive',
  Expired: 'Expired',
  Active: 'Active'
}

const useChannelStatus = (channel) => {
  const { status, inviteLink, keyExpiresAt } = useMemo(() => {
    if (!channel || !channel.UserKeys || !channel.UserKeys.length) {
      return {
        status: ChannelStatuses.Inactive
      }
    }

    const userKey = channel.UserKeys[0]

    if (new Date() >= new Date(userKey.keyExpiresAt)) {
      return {
        status: ChannelStatuses.Expired
      }
    }
    return {
      status: ChannelStatuses.Active,
      inviteLink: userKey.inviteLink,
      keyExpiresAt: new Date(userKey.keyExpiresAt).toLocaleDateString()
    }
  }, [channel])

  const { chainId } = channel

  return {
    status,
    inviteLink,
    keyExpiresAt,
    chainId,
    networkName: chainId === 100 ? 'xDai' : (chainId === 4 ? 'Rinkeby' : (chainId === 1 ? 'Mainnet' : 'Unknown'))
  }
}

export default useChannelStatus