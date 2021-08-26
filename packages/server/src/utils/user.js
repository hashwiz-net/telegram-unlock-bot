const { Channel, User, UserKey, Sequelize } = require('../models')

// TODO: Cache/memoize the results
async function bulkCheckUserPermission(userIds, channelId) {
  const channel = await Channel.findOne({
    where: { channelId: String(channelId) }
  })

  if (!channel || !channel.lockContract) {
    // Lock contract hasn't been configured yet
    return []
  }

  const dbUsers = await User.findAll({
    where: {
      userId: {
        [Sequelize.Op.in]: userIds.map((u) => String(u))
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

  for (const userId of userIds) {
    const dbEntry = dbUsers.find((user) => user.userId === String(userId))

    if (!dbEntry || !dbEntry.walletAddress) {
      usersToKick.push(userId)
      continue
    }

    if (dbEntry.keyExpiresAt > new Date()) {
      // Has a valid key, so skip
      continue
    }

    if (!dbEntry.walletAddress) {
      // Doesn't have a wallet linked
      usersToKick.push(userId)
      continue
    }

    // TODO: read permission from chain and store to DB
  }

  return usersToKick
}

module.exports = {
  bulkCheckUserPermission
}
