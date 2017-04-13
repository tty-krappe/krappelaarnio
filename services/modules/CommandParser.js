'use strict'

const _ = require('lodash')
const Promise = require('bluebird')

const SubstanceController = require('../controllers/SubstanceController')
const ActionType = require('../enums/ActionType')

const commands = [
  {
    actionType: ActionType.Krappe,
    allowedInterfaces: ['irc'],
    textCommands: ['krappe']
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
    this._commands = _.filter(commands, (cmd) => _.includes(cmd.allowedInterfaces, interfaceType))
  }

  resolve (nickname, message) {
    const parts = message.trim().split(' ')
    const cmdName = parts[0]

    if (!cmdName.length || cmdName[0] !== this._prefix) {
      return Promise.reject(new Error('Empty or not prefixed'))
    }

    const cmd = _.find(this._commands, (cmd) => _.includes(cmd.textCommands, cmdName.substr(1)))

    if (!cmd) {
      return SubstanceController.findByAlias(cmdName.substr(1))
        .then((substance) => {
          if (substance) {
            return {
              actionType: ActionType.SubstanceAbuse,
              message: _.drop(parts, 1).join(' '),
              nickname: nickname
            }
          } else {
            return Promise.reject(new Error('Unrecognized'))
          }
        })
        .catch((err) => {
          return Promise.reject(new Error(err))
        })
    }

    return Promise.resolve({
      actionType: cmd.actionType,
      message: _.drop(parts, 1).join(' '),
      nickname: nickname
    })
  }
}

module.exports = CommandParser
