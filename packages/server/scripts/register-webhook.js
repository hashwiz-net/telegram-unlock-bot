require('dotenv').config()
const fetch = require('node-fetch')

const { HOST, ADMIN_SECRET } = process.env
const serverUrl = HOST ? `https://${HOST}` : 'http://localhost:8008'

const go = async () => {
  const resp = await fetch(`${serverUrl}/api/webhook/init`, {
    method: 'POST',
    headers: {
      authorization: ADMIN_SECRET
    }
  })

  const { success } = await resp.json()

  if (success) {
    console.log('Webhook registered!')
  } else {
    console.log('Something went wrong, check your logs')
  }
}

go()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
