'use strict'

const Model = require('objection').Model
const _ = require('lodash')
const User = require('./User')
const Substance = require('./Substance')

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
        substanceId: {type: 'integer'},
        meta: {
          type: 'object',
          properties: {
            interface: {type: 'string', enum: ['irc', 'telegram']},
            nicknameAlias: {type: 'string'},
            commandAlias: {type: 'string'},
            message: {type: 'string'}
          }
        },
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
      },
      substance: {
        relation: Model.HasOneRelation,
        modelClass: Substance,
        join: {
          from: 'UserAction.substanceId',
          to: 'Substance.id'
        }
      }
    }
  }

  $beforeInsert () {
    this.createdAt = new Date().toISOString()
  }
}

module.exports = UserAction
