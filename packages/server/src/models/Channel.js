'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Channel.hasMany(models.UserKey, {
        foreignKey: 'channelId'
      })
    }
  }
  Channel.init(
    {
      channelId: DataTypes.STRING,
      name: DataTypes.STRING,
      chainId: DataTypes.INTEGER,
      lockContract: DataTypes.STRING,
      data: DataTypes.JSONB
    },
    {
      sequelize,
      modelName: 'Channel',
      tableName: 'channels'
    }
  )
  return Channel
}
