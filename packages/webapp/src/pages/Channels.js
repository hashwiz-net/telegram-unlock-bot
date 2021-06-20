import React, { useMemo } from 'react'

import useChannels from '../utils/useChannels'
import Text from '../components/basic/Text'
import PurchaseButton from '../components/PurchaseButton'
import Button from '../components/basic/Button'
import useChannelStatus from '../utils/useChannelStatus'
import { ChannelStatuses } from '../utils/useChannelStatus'


const Channel = ({ channel, reloadChannels }) => {
  const { status, inviteLink, keyExpiresAt } = useChannelStatus(channel)

  return (
    <tr>
      <td>{channel.name}</td>
      <td>{status}</td>
      <td>
        {status !== ChannelStatuses.Active ? null : (
          keyExpiresAt
        )}
      </td>
      <td className="flex">
        {status !== ChannelStatuses.Active ? null : (
          <Button linkButton href={inviteLink} target="_blank" rel="noreferrer noopener" className="py-1 px-3 text-sm md:min-w-0 my-0 mr-2 ml-0">Join</Button>
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
    return <Text className="my-3">You have no active/expired unlock keys to any channel</Text> 
  }

  return (
    <div className="container max-w-full overflow-x-scroll">
      <table style={{
        minWidth: '640px',
      }}>
        <thead>
          <tr>
            <td>Channel</td>
            <td>Membership Status</td>
            <td>Expiry Date</td>
            <td>Actions</td>
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
