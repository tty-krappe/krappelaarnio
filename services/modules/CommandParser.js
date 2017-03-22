'use strict'

const _ = require('lodash')

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

  resolve (user, message) {
    const parts = message.trim().split(' ')
    const action = parts[0]

    if (!action.length || action[0] !== this._prefix) {
      return false
    }

    const cmd = _.find(this._commands, (cmd) => _.contains(cmd.textCommands, action.substr(1)))

    if (!cmd) {
      // Check if substance
      return false
    }

    return {
      actionType: cmd.actionType,
      message: _.drop(parts, 1).join(' '),
      nickname: user
    }
  }
}

module.exports = CommandParser
