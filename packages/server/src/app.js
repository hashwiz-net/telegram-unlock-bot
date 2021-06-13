require('dotenv').config({})

const express = require('express')
const logger = require('morgan')

const channelsRouter = require('./routes/channels')
const webhookRouter = require('./routes/webhook')
const usersRouter = require('./routes/users')
const indexRouter = require('./routes/index')
const { startListener } = require('./utils/listener')

const app = express()

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/channels', channelsRouter)
app.use('/api/webhook', webhookRouter)
app.use('/api/users', usersRouter)
app.use('/api', indexRouter)

app._postStartup = () => {
  startListener()
}

module.exports = app
