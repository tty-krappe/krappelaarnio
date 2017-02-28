'use strict'

const Model = require('objection').Model
const _ = require('lodash')

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

  $beforeInsert () {
    this.createdAt = new Date().toISOString()
  }
}

module.exports = UserAction
