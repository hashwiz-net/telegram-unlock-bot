const express = require('express')
const router = express.Router()

const { pick } = require('lodash')

const { Channel, UserKey, User } = require('../models')

const safeFields = [
  'id',
  'channelId',
  'name',
  'chainId',
  'lockContract',
  'UserKeys'
]

router.get('/:chainId(\\d+)/:channelId', async (req, res) => {
  const { chainId, channelId } = req.params
  const { walletAddress } = req.query

  const channel = await Channel.findOne({
    where: {
      chainId,
      channelId
    },
    include: [
      {
        model: UserKey,
        required: false,
        include: [
          {
            model: User,
            where: {
              walletAddress: walletAddress.toLowerCase()
            },
            required: false
          }
        ]
      }
    ]
  })

  res.json({
    channel: pick(channel, safeFields)
  })
})

router.get('/:chainId(\\d+)', async (req, res) => {
  const { chainId } = req.params
  const { walletAddress } = req.query
  const channels = await Channel.findAll({
    where: {
      chainId
    },
    include: [
      {
        model: UserKey,
        required: true,
        include: [
          {
            model: User,
            where: {
              walletAddress: walletAddress.toLowerCase()
            },
            required: true
          }
        ]
      }
    ]
  })

  res.json({
    channels: channels.map((ch) => pick(ch, safeFields))
  })
})

module.exports = router
