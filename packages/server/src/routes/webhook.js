const express = require('express')
const { requireAdmin } = require('../utils/admin')
const processMessage = require('../utils/processMessage')
const { subscribeToHooks, hookEndpoint } = require('../utils/webhook')
const router = express.Router()

router.post('/init', requireAdmin, async (req, res) => {
  try {
    await subscribeToHooks()
    res.send({
      success: true
    })
  } catch (err) {
    console.error(err)
    res.send({
      success: false
    })
  }
})

router.post(`/${hookEndpoint}`, (req, res) => {
  processMessage(req.body.message)
  res.status(200).end()
})

module.exports = router
