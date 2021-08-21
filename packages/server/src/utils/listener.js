const ethers = require('ethers')

const { Channel, User, UserKey } = require('../models')

const abis = require('common/abis-v8')
const {
  kickChatMember,
  createChatInviteLink,
  revokeChatInviteLink
} = require('./webhook')

const networks = require('./networks')

const minBlockConfirmations = parseInt(
  process.env.MIN_BLOCK_CONFIRMATIONS || 12
)

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

const getChannel = async (channelAddress) => {
  const address = channelAddress.toLowerCase()
  let channel = channelsCache.get(address)
  if (!channel) {
    channel = await Channel.findOne({
      where: {
        lockContract: address
      }
    })

    if (channel) {
      channelsCache.set(address, channel.get({ plain: true }))
    }
  }

  return channel
}

const updateAddressLockStatus = async (address, channel, network) => {
  const { provider } = network
  console.log(
    `[${network.name}] Refetching status of address ${address} from blockchain...`
  )

  const user = await User.findOne({
    where: {
      walletAddress: address.toLowerCase()
    }
  })

  if (!user) {
    console.log(`[${network.name}] Skipping unlinked address: ${address}`)
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

const processLog = async (log, network) => {
  const channel = await getChannel(log.address.toLowerCase())

  if (!channel) {
    // Skip events from unknown contracts
    return
  }

  try {
    const [funcSign] = log.topics

    // TODO: try and do this in a queue
    if (funcSign === RenewEventSign) {
      // Handle renew
      console.log(
        `[${network.name}] Processing RenewKeyPurchase event`,
        log.transactionHash
      )

      const address = `0x${log.topics[1].slice(-40)}`
      updateAddressLockStatus(address, channel, network)
    } else if (funcSign === TransferEventSign) {
      // Handle new license
      console.log(
        `[${network.name}] Processing Transfer event`,
        log.transactionHash
      )

      const [, address1, address2] = log.topics
      const fromAddress = `0x${address1.slice(-40)}`
      const toAddress = `0x${address2.slice(-40)}`

      if (fromAddress !== ZeroAddress) {
        updateAddressLockStatus(fromAddress, channel, network)
      }

      if (toAddress !== ZeroAddress) {
        updateAddressLockStatus(toAddress, channel, network)
      }
    }
  } catch (err) {
    console.error(
      `[${network.name}] Failed to process log from blockchain`,
      log.transactionHash,
      err
    )
  }
}

const startListener = async (network) => {
  console.log(`Starting listener for ${network.name} network...`)

  const { provider } = network

  provider.on('block', async (latestBlockNumber) => {
    const blockNumber = latestBlockNumber - minBlockConfirmations

    const newFilters = {
      ...filters,
      fromBlock: blockNumber,
      toBlock: blockNumber
    }

    const logs = await provider.getLogs(newFilters)

    for (const log of logs) {
      processLog(log, network)
    }
  })

  console.log(`Listener started for ${network.name}`)
}

const startAllListeners = async () => {
  await fetchAllChannels()

  for (const network of networks) {
    startListener(network)
  }
}

module.exports = {
  startAllListeners
}
