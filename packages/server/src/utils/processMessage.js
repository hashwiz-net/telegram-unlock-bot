const { get } = require('lodash')
const ethers = require('ethers')
const redis = require('./redis')
const { Channel, User } = require('../models')
const { sendMessage, isAdmin, kickChatMember } = require('./webhook')
const { bulkCheckUserPermission } = require('./user')

const supportedChains = [1, 4]

async function processBotCommand(message) {
  const params = /^\/setlock ([0-9]+) (.+)$/gi.exec(message.text)

  const chainId = Number(get(params, '1'))
  const lockAddress = get(params, '2', '').toLowerCase()

  const chatId = get(message, 'chat.id')
  const messageId = message.message_id
  const senderId = get(message, 'from.id')

  const replyWithText = (text) => sendMessage(chatId, text, messageId)

  const admin = await isAdmin(chatId, senderId)

  if (!admin) {
    return replyWithText(`You don't have the permission to do this operation`)
  }

  if (!supportedChains.includes(chainId)) {
    return replyWithText(`Unsupported network`)
  }

  if (!lockAddress) {
    return replyWithText(`Unknown command`)
  }

  if (!ethers.utils.isAddress(lockAddress)) {
    return replyWithText(`Invalid address`)
  }

  const dbEntry = await Channel.findOne({
    where: { channelId: String(chatId) }
  })

  const name = get(message, 'chat.title')

  if (dbEntry) {
    await dbEntry.update({
      name,
      lockContract: lockAddress,
      data: message
    })
  } else {
    await Channel.create({
      name,
      channelId: String(chatId),
      chainId,
      lockContract: lockAddress,
      data: message
    })
  }

  const purchaseLink = `https://${process.env.HOST}/#/channel/${chatId}`

  return replyWithText(
    `Lock address set to ${lockAddress}. Send your users to this link to purchase a key ${purchaseLink}`
  )
}

async function processVerification(message) {
  const params = /^\/start (.+)$/gi.exec(message.text)

  const linkCode = get(params, '1', '')

  const chatId = get(message, 'chat.id')
  const messageId = message.message_id
  const senderId = get(message, 'from.id')

  const replyWithText = (text) => sendMessage(chatId, text, messageId)

  const redisKey = `link:${linkCode}`

  const dataStr = await redis.get(redisKey)

  if (!dataStr) return replyWithText('Invalid/expired linking code. Try again')

  try {
    const { walletAddress, sign } = JSON.parse(dataStr)

    const existingEntry = await User.findOne({
      where: {
        walletAddress: walletAddress.toLowerCase()
      }
    })

    const userProps = {
      userId: senderId,
      username: get(message, 'from.username'),
      walletAddress: walletAddress.toLowerCase(),
      data: { sign }
    }

    if (!existingEntry) {
      await User.create(userProps)
    } else {
      await existingEntry.update(userProps)
    }

    return replyWithText(
      `Congrats! Your telegram ID has been linked with the wallet ${walletAddress.slice(
        0,
        6
      )}...${walletAddress.slice(-4)}`
    )
  } catch (err) {
    console.error('failed to process command', err)
    replyWithText(`Something went wrong, try again later.`)
  } finally {
    await redis.del(redisKey)
  }
}

async function checkAndKickUnauthorizedNewMembers(message) {
  const userIds = get(message, 'new_chat_members', []).map((user) => user.id)

  if (get(message, 'from.id')) {
    userIds.push(message.from.id)
  }

  if (!userIds.length) {
    return
  }

  const chatId = get(message, 'chat.id')
  const messageId = message.message_id

  const replyWithText = (text) => sendMessage(chatId, text, messageId)

  const usersToKick = await bulkCheckUserPermission(userIds, chatId)

  for (const userId of usersToKick) {
    await kickChatMember(chatId, userId)
    replyWithText(`Doesn't own an unlock key to the channel; kicked out`)
  }
}

async function processMessage(message) {
  if (!message) {
    // Nothing to process
    return
  }

  const isBotCommand = get(message, 'text', '').startsWith('/')
  if (isBotCommand) {
    if (get(message, 'chat.type') === 'group') {
      processBotCommand(message)
    } else {
      processVerification(message)
    }
  }

  checkAndKickUnauthorizedNewMembers(message)
}

module.exports = processMessage
