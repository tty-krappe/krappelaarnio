'use strict'

const Model = require('objection').Model
const _ = require('lodash')
const User = require('./User')

const ActionType = require('../enums/ActionType')

class UserAction extends Model {
  static get tableName () {
    return 'UserAction'
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: ['action'],

      properties: {
        id: {type: 'integer'},
        userId: {type: 'integer'},
        action: {type: 'string', enum: _.values(ActionType)},
        createdAt: {
          type: ['string', 'null'],
          format: ['date-time', 'null']
        }
      }
    }
  }

  static get relationMappings () {
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: 'UserAction.userId',
          to: 'User.id'
        }
      }
    }
  }

  $beforeInsert () {
    this.createdAt = new Date().toISOString()
  }
}

module.exports = UserAction
