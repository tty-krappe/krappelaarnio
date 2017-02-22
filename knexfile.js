module.exports = {
  client: 'postgresql',
  connection: {
    database: 'krappe',
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
