// Update with your config settings.

module.exports = {
    client: 'mysql2',
    connection: {
      database: 'primeflix',
      user:     'root',
      password: '12345678'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
