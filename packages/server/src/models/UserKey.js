'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserKey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserKey.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      UserKey.belongsTo(models.Channel, {
        foreignKey: 'channelId'
      })
    }
  }
  UserKey.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
      },
      channelId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'channels', key: 'id' }
      },
      keyId: DataTypes.STRING,
      keyExpiresAt: DataTypes.DATE,
      inviteLink: {
        type: DataTypes.STRING,
        defaultValue: ''
      },
      data: DataTypes.JSONB
    },
    {
      sequelize,
      modelName: 'UserKey',
      tableName: 'user_keys'
    }
  )
  return UserKey
}
