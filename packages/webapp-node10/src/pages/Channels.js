import React, { useMemo } from 'react'

import useChannels from '../utils/useChannels'
import Text from '../components/basic/Text'
import PurchaseButton from '../components/PurchaseButton'
import Button from '../components/basic/Button'

const ChannelStatuses = {
  Inactive: 'Inactive',
  Expired: 'Expired',
  Active: 'Active'
}

const Channel = ({ channel, reloadChannels }) => {
  const { status, inviteLink, keyExpiresAt } = useMemo(() => {
    if (!channel.UserKeys || !channel.UserKeys.length) {
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


  return (
    <tr>
      <td>{channel.name}</td>
      <td>{status}</td>
      <td>
        {status !== ChannelStatuses.Active ? null : (
          keyExpiresAt
        )}
      </td>
      <td>
        {status !== ChannelStatuses.Active || !inviteLink ? null : (
          <a href={inviteLink} target="_blank" rel="noreferrer noopener" className="btn btn-primary btn-sm my-0 mr-2 ml-0">Invite Link</a>
        )}
        <PurchaseButton lockAddress={channel.lockContract} afterPurchase={reloadChannels}>
          {status === ChannelStatuses.Active ? 'Extend' : status === ChannelStatuses.Expired ? 'Renew' : 'Unlock'}
        </PurchaseButton>
      </td>
    </tr>
  )
}

const Channels = () => {
  const { channels, loading, reload } = useChannels()

  if (loading) {
    return <Text className="my-3">Loading...</Text> 
  }

  if (!channels.length) {
    return <Text className="my-3">No channels found</Text> 
  }

  return (
    <div className="container">
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Channel</th>
            <th scope="col">Membership Status</th>
            <th scope="col">Expiry Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {channels.map(channel => (
            <Channel reloadChannels={reload} channel={channel} key={channel.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Channels
