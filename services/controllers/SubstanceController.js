'use strict'

const Knex = require('knex')
const knexConfig = require('../../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

const Substance = require('../models/Substance').bindKnex(knex)

module.exports = {
  findByAlias: (substanceName) => {
    return Substance
      .query()
      .whereJsonSupersetOf('Substance.aliases', [substanceName])
      .first()
      .then((substance) => {
        return substance
      })
  }
}
