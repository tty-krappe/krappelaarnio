'use strict'

const Promise = require('bluebird')
const knexConfig = require('../../knexfile')
const knex = require('knex')(knexConfig[process.env.NODE_ENV || 'development'])

const db = {
  Substance: require('../models/Substance').bindKnex(knex),
  User: require('../models/User').bindKnex(knex),
  truncate: function () {
    return Promise.all([
      this.Substance.query().delete(),
      this.User.query().delete()
    ])
  }
}

const fromFile = (fn) => {
  return (filePath) => fn(require(filePath))
}

const populateSubstances = (data) => {
  return db.truncate().then(() => {
    return db.Substance.query().insertWithRelated(data)
  })
}

const populateUsers = (data) => {
  return db.truncate().then(() => {
    return db.User.query().insertWithRelated(data)
  })
}

module.exports = {
  populateSubstancesFromJson: fromFile(populateSubstances),
  populateSubstances: populateSubstances,
  populateUsersFromJson: fromFile(populateUsers),
  populateUsers: populateUsers
}
