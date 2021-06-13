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
      keyExpiresAt: new Date(userKey.keyExpiresAt).toISOString()
    }
  }, [channel])

  return {
    status,
    inviteLink,
    keyExpiresAt
  }
}

export default useChannelStatus