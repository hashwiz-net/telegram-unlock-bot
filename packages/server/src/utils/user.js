const { Channel, User, UserKey, Sequelize } = require('../models')

// TODO: Cache/memoize the results
async function bulkCheckUserPermission(usernames, channelId) {
  const channel = await Channel.findOne({
    where: { channelId: String(channelId) }
  })

  if (!channel || !channel.lockContract) {
    // Lock contract hasn't been configured yet
    return []
  }

  const dbUsers = await User.findAll({
    where: {
      username: {
        [Sequelize.Op.in]: usernames.map((u) => String(u))
      }
    },
    include: [
      {
        model: UserKey,
        required: true,
        where: {
          channelId: channel.id
        },
        include: [
          {
            model: Channel,
            required: true
          }
        ]
      }
    ]
  })

  const usersToKick = []

  for (const username of usernames) {
    const dbEntry = dbUsers.find((user) => user.username === String(username))

    if (!dbEntry || !dbEntry.walletAddress) {
      usersToKick.push(username)
      continue
    }

    if (dbEntry.keyExpiresAt > new Date()) {
      // Has a valid key, so skip
      continue
    }

    if (!dbEntry.walletAddress) {
      // Doesn't have a wallet linked
      usersToKick.push(username)
      continue
    }

    // TODO: read permission from chain and store to DB
  }

  return usersToKick
}

module.exports = {
  bulkCheckUserPermission
}
