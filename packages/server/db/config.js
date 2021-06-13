'use strict'
require('dotenv').config()

// DB config for migrations only.
// The config used by the app is under src/models/index.js
const max_connections = process.env.MAX_CONNECTION_POOL
  ? parseInt(process.env.MAX_CONNECTION_POOL)
  : 10

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL',
    define: {
      // Add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
      // Disable the modification of table names.
      freezeTableName: true,
      // Underscore style for field names.
      underscored: true
    },
    // Disable logging of SQL statements.
    logging: false
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    define: {
      // Add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
      // Disable the modification of table names.
      freezeTableName: true,
      // Underscore style for field names.
      underscored: true
    },
    // Disable logging of SQL statements.
    logging: false
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    define: {
      // Add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
      // Disable the modification of table names.
      freezeTableName: true,
      // Underscore style for field names.
      underscored: true
    },
    // Below is required for Heroku Postgres to work.
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    // Connection pooling
    pool: {
      max: max_connections,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // Disable logging of SQL statements.
    logging: false
  }
}
