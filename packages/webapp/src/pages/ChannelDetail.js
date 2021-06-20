import React, { useEffect, useState } from 'react'
import Card from '../components/basic/Card'
import Text from '../components/basic/Text'
import Title from '../components/basic/Title'
import Button from '../components/basic/Button'
import PurchaseButton from '../components/PurchaseButton'

import useChannel from '../utils/useChannel'
import useChannelStatus from '../utils/useChannelStatus'
import { ChannelStatuses } from '../utils/useChannelStatus'

const ChannelDetail = ({ match }) => {
  const channelId = match.params.channelId

  const [shouldOpenInviteLink, setShouldOpenInviteLink] = useState(false)
  
  const { channel, loading, reload } = useChannel(channelId)

  const { status, inviteLink, keyExpiresAt } = useChannelStatus(channel)

  useEffect(() => {
    if (shouldOpenInviteLink && inviteLink) {
      setShouldOpenInviteLink(false)
      window.open(inviteLink, '_blank')
    }
  }, [shouldOpenInviteLink, inviteLink])

  if (loading) {
    return <Text className="my-3">Loading...</Text> 
  }

  if (!channel) {
    return <Text className="my-3">Invalid channel</Text> 
  }

  const afterPurchase = () => {
    setShouldOpenInviteLink(true)
    reload()
  }

  return (
    <div className="container px-8 py-4">
      <Card>
        <Title>{channel.name}</Title>

        <Text>
          {status === ChannelStatuses.Active ? (
            `You have an active subscription to the channel that expires on ${(new Date(keyExpiresAt)).toLocaleString()}.`
          ) : status === ChannelStatuses.Expired ? 'Your subscription to the channel has expired. Renew it to gain access.' : 
          'Get an unlock key to gain access to the channel.'}
        </Text>

        <div className="flex items-center justify-center">
          {status !== ChannelStatuses.Active ? null : (
            <Button linkButton className="mx-2" href={inviteLink} target="_blank" rel="noopener noreferrer">
              Join
            </Button>
          )}
          <PurchaseButton className="mx-2" lockAddress={channel.lockContract} afterPurchase={afterPurchase}>
            {status === ChannelStatuses.Active ? 'Extend' : status === ChannelStatuses.Expired ? 'Renew' : 'Unlock'}
          </PurchaseButton>
        </div>
      </Card>

    </div>
  )
}

export default ChannelDetail
