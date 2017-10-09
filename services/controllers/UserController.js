'use strict'

const Knex = require('knex')
const knexConfig = require('../../knexfile')
const knex = Knex(knexConfig[process.env.NODE_ENV || 'development'])

const User = require('../models/User').bindKnex(knex)

module.exports = {
  findUser: (userName) => {
    return User
      .query()
      .whereJsonSupersetOf('User.aliases', [userName])
      .orWhere('nickname', '=' , userName)
      .first()
      .then((user) => {
        return user
      })
  },

/*   getUserActionsByDateAndType(alias, startTime, endTime, actionType) {
    return this.findUser(alias)
      .eager('actions')
      .modifyEager('actions', builder => {
        builder.where('action', '=', actionType)

        if (startTime){
          builder.whereRaw('?? >= ?::timestamp' ['createdAt', startTime.toISOString()])
        }

        if (endTime) {
          builder.whereRaw('?? <= ?:timestamp' ['createdAt', endTime.toISOString()])
        }
      })
  } */

}
