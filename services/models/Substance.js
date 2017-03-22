'use strict'

const Model = require('objection').Model

class Substance extends Model {
  static get tableName () {
    return 'Substance'
  }

  static get jsonSchema () {
    return {
      type: 'object',

      properties: {
        id: {type: 'integer'},
        substanceType: {type: 'string', minLength: 1, maxLength: 255},

        aliases: {
          type: ['array', 'null'],
          items: {
            type: 'string',
            minLength: 1,
            maxLength: 255
          }
        }
      }
    }
  }
}

module.exports = Substance
