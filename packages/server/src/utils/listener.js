const ethers = require('ethers')

const { Channel, User, UserKey } = require('../models')

const abis = require('common/abis-v8')
const {
  kickChatMember,
  createChatInviteLink,
  revokeChatInviteLink
} = require('./webhook')

const provider = new ethers.providers.InfuraProvider('rinkeby', {
  projectId: process.env.INFURA_PROJECT_ID,
  projectSecret: process.env.INFURA_PROJECT_SECRET
})

const TransferEventSign = ethers.utils.id('Transfer(address,address,uint256)')
const RenewEventSign = ethers.utils.id('RenewKeyPurchase(address,uint256)')

const ZeroAddress = '0x0000000000000000000000000000000000000000'

const filters = {
  topics: [[TransferEventSign, RenewEventSign]]
}

const channelsCache = new Map()

const fetchAllChannels = async () => {
  const channels = await Channel.findAll()
  for (const channel of channels) {
    channelsCache.set(
      channel.lockContract.toLowerCase(),
      channel.get({ plain: true })
    )
  }
}

const updateAddressLockStatus = async (address, channel) => {
  console.log(`Refetching status of address ${address} from blockchain...`)

  const user = await User.findOne({
    where: {
      walletAddress: address.toLowerCase()
    }
  })

  if (!user) {
    console.log(`Skipping unlinked address: ${address}`)
    return
  }

  const lockContract = new ethers.Contract(
    channel.lockContract,
    abis.PublicLock.abi,
    provider
  )

  const expireTimestamp = await lockContract.keyExpirationTimestampFor(address)

  const keyExpiresAt = new Date(expireTimestamp.toNumber() * 1000)

  let userKey = await UserKey.findOne({
    where: {
      userId: user.id,
      channelId: channel.id
    }
  })

  if (userKey) {
    await userKey.update({
      keyExpiresAt: keyExpiresAt
    })
  } else {
    userKey = await UserKey.create({
      userId: user.id,
      channelId: channel.id,
      keyExpiresAt
    })
  }

  if (userKey.keyExpiresAt <= new Date()) {
    await kickChatMember(channel.channelId, user.userId)
    await revokeChatInviteLink(channel.channelId, userKey.inviteLink)
    await userKey.update({
      inviteLink: ''
    })
  } else {
    if (userKey.inviteLink) {
      await revokeChatInviteLink(channel.channelId, userKey.inviteLink)
    }

    const { result } = await createChatInviteLink(
      channel.channelId,
      keyExpiresAt.getTime() / 1000
    )

    await userKey.update({
      inviteLink: result.invite_link
    })
  }

  console.log(`Status updated for ${address}`)
}

const startListener = async () => {
  console.log('Starting listener...')

  provider.off(filters)

  await fetchAllChannels()

  provider.on(filters, async (log) => {
    const channel = channelsCache.get(log.address.toLowerCase())

    if (!channel) {
      // Skip events from unknown contracts
      return
    }

    try {
      const [funcSign] = log.topics

      // TODO: try and do this in a queue
      if (funcSign === RenewEventSign) {
        // Handle renew
        console.log('Processing RenewKeyPurchase event', log.transactionHash)

        const address = `0x${log.topics[1].slice(-40)}`
        updateAddressLockStatus(address, channel)
      } else if (funcSign === TransferEventSign) {
        // Handle new license
        console.log('Processing Transfer event', log.transactionHash)

        const [, address1, address2] = log.topics
        const fromAddress = `0x${address1.slice(-40)}`
        const toAddress = `0x${address2.slice(-40)}`

        if (fromAddress !== ZeroAddress) {
          updateAddressLockStatus(fromAddress, channel)
        }

        if (toAddress !== ZeroAddress) {
          updateAddressLockStatus(toAddress, channel)
        }
      }
    } catch (err) {
      console.error(
        'Failed to process log from blockchain',
        log.transactionHash,
        err
      )
    }
  })

  console.log('Listener started')
}

module.exports = {
  startListener
}
