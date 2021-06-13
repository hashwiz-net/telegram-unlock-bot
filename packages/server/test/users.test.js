'use strict'

const chai = require('chai')
const expect = chai.expect
const request = require('supertest')

const ethers = require('ethers')

const app = require('../src/app')
const { User } = require('../src/models')

describe('/users endpoint tests', () => {
  beforeEach(async () => {
    await User.destroy({ truncate: true })
  })
  it('should allow to link a wallet with a telegram account', async () => {
    const wallet = ethers.Wallet.createRandom()
    const username = `testUsername123`
    const sign = await wallet.signMessage(`I own Telegram this account: ${username}`)

    const response = await request(app)
      .post(`/users/link-wallet`)
      .send({
        walletAddress: wallet.address,
        username,
        sign
      })
      .expect(200)

    expect(response.body.success).to.be.true

    const dbEntry = await User.findOne({})
    expect(dbEntry.walletAddress).to.equal(wallet.address.toLowerCase())
    expect(dbEntry.tgUsername).to.equal(username)
  })

  it('should allow to update linked telegram account', async () => {
    const wallet = ethers.Wallet.createRandom()
    let username = `testUsername123`
    let sign = await wallet.signMessage(`I own Telegram this account: ${username}`)

    let response = await request(app)
      .post(`/users/link-wallet`)
      .send({
        walletAddress: wallet.address,
        username,
        sign
      })
      .expect(200)

    expect(response.body.success).to.be.true

    let dbEntry = await User.findOne({})
    expect(dbEntry.walletAddress).to.equal(wallet.address.toLowerCase())
    expect(dbEntry.tgUsername).to.equal(username)

    // Update request
    username = `notATest1234`
    sign = await wallet.signMessage(`I own Telegram this account: ${username}`)

    response = await request(app)
      .post(`/users/link-wallet`)
      .send({
        walletAddress: wallet.address,
        username,
        sign
      })
      .expect(200)

    expect(response.body.success).to.be.true

    const dbCount = await User.count()
    expect(dbCount).to.equal(1)

    dbEntry = await User.findOne({})
    expect(dbEntry.walletAddress).to.equal(wallet.address.toLowerCase())
    expect(dbEntry.tgUsername).to.equal(username)
  })

  it('should throw on invalid sign', async () => {
    const wallet = ethers.Wallet.createRandom()
    const username = `test_username`
    const sign = await wallet.signMessage(`I don't own Telegram this account: ${username}`)

    const response = await request(app)
      .post(`/users/link-wallet`)
      .send({
        walletAddress: wallet.address,
        username,
        sign
      })
      .expect(400)

    expect(response.body.success).to.be.not.true
    expect(response.body.errors[0]).to.equal('Invalid signature')
  })
})
