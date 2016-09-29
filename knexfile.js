module.exports = {
  client: 'postgresql',
  connection: {
    database: 'krappelaarnio',
    user: 'laarnio',
    password: 'krappe',
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
