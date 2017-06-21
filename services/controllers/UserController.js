'use strict'

const Knex = require('knex')
const knexConfig = require('../../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

const User = require('../models/User').bindKnex(knex)

module.exports = {
  findByAlias: (userName) => {
    return Substance
      .query()
      .whereJsonSupersetOf('User.aliases', [userName])
      .first()
  }
}
