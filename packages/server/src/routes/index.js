const express = require('express')
const router = express.Router()

router.all('*', (req, res) => {
  return res.status(404).send({
    errors: ['Invalid API endpoint']
  })
})

module.exports = router
