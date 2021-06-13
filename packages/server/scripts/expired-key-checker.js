require('dotenv').config()

const { UserKey, User, Channel, Sequelize } = require('../src/models')
const { kickChatMember, revokeChatInviteLink } = require('../src/utils/webhook')

const go = async () => {
  const expiredKeys = await UserKey.findAll({
    where: {
      keyExpiresAt: {
        [Sequelize.Op.lt]: new Date()
      },
      inviteLink: {
        [Sequelize.Op.ne]: ''
      }
    },
    include: [User, Channel]
  })

  for (const userKey of expiredKeys) {
    try {
      await kickChatMember(userKey.Channel.channelId, userKey.User.userId)
      await revokeChatInviteLink(userKey.Channel.channelId, userKey.inviteLink)
      await userKey.update({
        inviteLink: ''
      })
    } catch (err) {
      console.error('Failed to revoke access for expired key', userKey.id, err)
    }
  }
}

go()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
