require('dotenv').config({})

const express = require('express')
const logger = require('morgan')

const serveStatic = require('serve-static')

const channelsRouter = require('./routes/channels')
const webhookRouter = require('./routes/webhook')
const usersRouter = require('./routes/users')
const indexRouter = require('./routes/index')
const { startAllListeners } = require('./utils/listener')

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

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic(`${__dirname}/../public`))
}

app._postStartup = () => {
  startAllListeners()
}

module.exports = app
