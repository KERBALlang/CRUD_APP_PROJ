// Update with your config settings.

const postgres = require("postgres");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://postgres:docker@localhost/postgres'
    // connection:{
    //   host: '127.0.0.1',
    //   password: 'docker',
    //   user: 'postgres',
    //   port: 5432,
    //   database: 'postgres'
    // }
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user:     'postgres',
      password: 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'docker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
