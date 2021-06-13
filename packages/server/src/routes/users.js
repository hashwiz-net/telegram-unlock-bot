const express = require('express')
const router = express.Router()

const ethers = require('ethers')
const randomstring = require('randomstring')

const redis = require('../utils/redis')

const { User } = require('../models')

const {
  linkWalletValidations,
  validationErrorHandler,
  checkWalletStatusValidations
} = require('../utils/validators')

router.get(
  '/wallet-status',
  checkWalletStatusValidations,
  validationErrorHandler,
  async (req, res) => {
    const { walletAddress } = req.query

    const user = await User.findOne({
      where: {
        walletAddress: walletAddress.toLowerCase()
      }
    })

    res.json({
      walletLinked: Boolean(user)
    })
  }
)

router.post(
  '/generate-link-code',
  linkWalletValidations,
  validationErrorHandler,
  async (req, res) => {
    const { walletAddress, sign } = req.body

    const signer = ethers.utils.verifyMessage(
      `I want to use this wallet for Telegram Unlock Bot`,
      sign
    )

    if (signer !== walletAddress) {
      return res.status(400).send({
        errors: ['Invalid signature']
      })
    }

    const linkCode = randomstring.generate(16)

    await redis.setex(
      `link:${linkCode}`,
      30 * 60,
      JSON.stringify({
        walletAddress,
        sign
      })
    )

    return res.status(200).send({
      success: true,
      linkCode
    })
  }
)

module.exports = router
