'use strict'

class CommandParser {
  constructor (interfaceType) {
    this._interfaceType = interfaceType
  }

  resolve (user, message) {
    return `${this._interfaceType}: ${user} > ${message}`
  }
}

module.exports = CommandParser
