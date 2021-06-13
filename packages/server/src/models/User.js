'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.UserKey, {
        foreignKey: 'userId'
      })
    }
  }
  User.init(
    {
      userId: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        allowNull: true
      },
      walletAddress: DataTypes.STRING,
      data: DataTypes.JSONB
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users'
    }
  )
  return User
}
