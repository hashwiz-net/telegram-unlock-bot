const Redis = require('ioredis')

const opts = {}

if (process.env.NODE_ENV === 'production') {
  opts.tls = {
    rejectUnauthorized: false
  }
}

const redis = new Redis(process.env.REDIS_URL, opts)

module.exports = redis
