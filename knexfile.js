module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'krappelaarnio',
      user: 'krappe',
      password: 'laarnio',
      port: 5434
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    }
  },
  testing: {
    client: 'postgresql',
    connection: {
      database: 'krappetesti',
      user: 'krappe',
      password: 'laarnio',
      port: 5434
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations'
    }
  }
}
