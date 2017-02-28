'use strict'

const Model = require('objection').Model
const UserAction = require('./UserAction')

class User extends Model {
  static get tableName () {
    return 'User'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['nickName'],

      properties: {
        id: {type: 'integer'},
        nickName: {type: 'string', minLength: 1, maxLength: 255},

        aliases: {
          type: ['array', 'null'],
          items: {
            type: 'string',
            minLength: 1,
            maxLength: 255
          }
        },

        updatedAt: {
          type: ['string', 'null'],
          format: ['date-time', 'null']
        }
      }
    }
  }

  static get relationMappings () {
    return {
      actions: {
        relation: Model.HasManyRelation,
        modelClass: UserAction,
        join: {
          from: 'User.id',
          to: 'UserAction.userId'
        }
      }
    }
  }

  $beforeUpdate () {
    this.updatedAt = new Date().toISOString()
  }
}

module.exports = User
