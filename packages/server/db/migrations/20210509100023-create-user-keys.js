'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_keys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      channel_id: {
        type: Sequelize.INTEGER
      },
      key_id: {
        type: Sequelize.STRING
      },
      key_expires_at: {
        type: Sequelize.DATE
      },
      invite_link: {
        type: Sequelize.STRING
      },
      data: {
        type: Sequelize.JSONB
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('user_keys')
  }
}
