'use strict'

const _ = require('lodash')
const Promise = require('bluebird')

const ActionType = require('../enums/ActionType')

const commands = [
  {
    actionType: ActionType.Krappe,
    allowedInterfaces: ['irc'],
    textCommands: ['krappe']
  },
  {
    actionType: ActionType.SubstanceAbuse,
    allowedInterfaces: ['irc', 'telegram']
  },
  {
    actionType: ActionType.Wasted,
    allowedInterfaces: ['irc', 'telegram'],
    textCommands: ['naamat', 'naamt', 'naamta']
  }
]

class CommandParser {
  constructor (interfaceType) {
    this._prefix = '!'
    this._commands = _.filter(commands, (cmd) => _.contains(cmd.allowedInterfaces, interfaceType))
  }

  resolve (nickname, message) {
    const parts = message.trim().split(' ')
    const cmdName = parts[0]

    if (!cmdName.length || cmdName[0] !== this._prefix) {
      return Promise.reject(new Error('Empty or not prefixed'))
    }

    const cmd = _.find(this._commands, (cmd) => _.contains(cmd.textCommands, cmdName.substr(1)))

    if (!cmd) {
      // Check if substance
      return Promise.reject(new Error('Unrecognized'))
    }

    return Promise.resolve({
      actionType: cmd.actionType,
      message: _.drop(parts, 1).join(' '),
      nickname: nickname
    })
  }
}

module.exports = CommandParser
