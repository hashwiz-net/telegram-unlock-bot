'use strict'

const ethers = require('ethers')
const { body, validationResult, query } = require('express-validator')

const validationErrorHandler = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ errors: errors.array({ onlyFirstError: true }) })
  }
  next()
}

const addressValidation = (param) =>
  param
    .notEmpty()
    .withMessage('Wallet address is required')
    .custom((address) => {
      return ethers.utils.isAddress(address)
    })
    .withMessage('Not a valid Ethereum address')

const linkWalletValidations = [
  // body('username').notEmpty().withMessage('Username is required'),
  addressValidation(body('walletAddress')),
  body('sign')
    .notEmpty()
    .withMessage('Signature is required')
    .custom((data) => {
      return ethers.utils.isHexString(data)
    })
    .withMessage('Not a valid signature')
]

const checkWalletStatusValidations = [addressValidation(query('walletAddress'))]

module.exports = {
  validationErrorHandler,
  checkWalletStatusValidations,
  linkWalletValidations
}
