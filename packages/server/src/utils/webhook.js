const fetch = require('node-fetch')

const { BOT_TOKEN, HOST } = process.env

const hookEndpoint = (BOT_TOKEN || '').split(':')[1]

const telegramBaseUrl = `https://api.telegram.org/bot${BOT_TOKEN}`

async function subscribeToHooks() {
  const webhookURL = encodeURIComponent(
    `https://${HOST}/api/webhook/${hookEndpoint}`
  )

  const allowedUpdates = encodeURIComponent(
    JSON.stringify([
      'message',
      'edited_message',
      'channel_post',
      'edited_channel_post'
    ])
  )

  const registerURL = `${telegramBaseUrl}/setWebhook?url=${webhookURL}&max_connections=100&allowed_updates=${allowedUpdates}`

  const response = await fetch(registerURL)
  const body = await response.json()

  if (!body.ok) {
    throw body
  }

  if (body.result === true) {
    console.log(`Webhook already live on the URL`)
    return
  }

  console.log(`Webhook is now live.`)
}

async function getChatMember(chatId, userId) {
  const response = await fetch(
    `${telegramBaseUrl}/getChatMember?chat_id=${chatId}&user_id=${userId}`
  )

  return response.json()
}

async function kickChatMember(chatId, userId) {
  const response = await fetch(
    `${telegramBaseUrl}/kickChatMember?chat_id=${chatId}&user_id=${userId}`
  )

  return response.json()
}

async function createChatInviteLink(chatId, expireDate) {
  const response = await fetch(
    `${telegramBaseUrl}/createChatInviteLink?chat_id=${chatId}&expire_date=${expireDate}&member_limit=1`
  )

  return response.json()
}

async function revokeChatInviteLink(chatId, inviteLink) {
  const response = await fetch(
    `${telegramBaseUrl}/revokeChatInviteLink?chat_id=${chatId}&invite_link=${inviteLink}`
  )

  return response.json()
}

async function isAdmin(chatId, userId) {
  try {
    const chatMember = await getChatMember(chatId, userId)

    return ['administrator', 'creator'].includes(chatMember.result.status)
  } catch (err) {
    return false
  }
}

async function sendMessage(chatId, text, replyToMessageId) {
  try {
    const response = await fetch(`${telegramBaseUrl}/sendMessage`, {
      method: 'POST',
      body: JSON.stringify({
        chat_id: chatId,
        text,
        reply_to_message_id: replyToMessageId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return response.json()
  } catch (err) {
    console.error('Failed to send message', err)
  }
}

module.exports = {
  hookEndpoint,
  getChatMember,
  isAdmin,
  subscribeToHooks,
  sendMessage,
  kickChatMember,
  createChatInviteLink,
  revokeChatInviteLink
}
