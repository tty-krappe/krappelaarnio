const chai = require('chai')
const expect = chai.expect

const CommandParser = require('../../modules/CommandParser')

describe('CommandParser', () => {
  describe('Telegram', () => {
    let telegramParser

    beforeEach(() => {
      telegramParser = new CommandParser('telegram')
    })

    it('should properly parse !naamat command', () => {
      const parsedCmd = telegramParser.resolve('arttu', '!naamat')
      expect(parsedCmd.command.actionType).to.equal('wasted')
      expect(parsedCmd.nickname).to.equal('arttu')
      expect(parsedCmd.message).to.equal('')
    })

    it('should return false on unrecognized command', () => {
      expect(telegramParser.resolve('laarnio', '!vittuvääräsuunta')).to.be.false
    })

    it('should properly parse !naamat aliases', () => {
      let parsedCmd = telegramParser.resolve('kukis', '!naamt')
      expect(parsedCmd.command.actionType).to.equal('wasted')

      parsedCmd = telegramParser.resolve('masi', '!naamta')
      expect(parsedCmd.command.actionType).to.equal('wasted')
    })

    it('should properly parse !naamat command and additional message', () => {
      const parsedCmd = telegramParser.resolve('atte', '!naamat as fuck')
      expect(parsedCmd.message).to.equal('as fuck')
    })

    it('should not allow !krappe command in telegram', () => {
      expect(telegramParser.resolve('uusidiootti', '!krappe')).to.be.false
    })
  })

  describe('Irc', () => {
    let ircParser

    beforeEach(() => {
      ircParser = new CommandParser('irc')
    })

    it('should properly resolve !krappe command', () => {
      const parsedCmd = ircParser.resolve('krippe', '!krappe')
      expect(parsedCmd.command.actionType).to.equal('krappe')
      expect(parsedCmd.nickname).to.equal('krippe')
      expect(parsedCmd.message).to.equal('')
    })

    it('should properly resolve !krappe command and additional message', () => {
      const parsedCmd = ircParser.resolve('krippe', '!krappe infernaalinen')
      expect(parsedCmd.command.actionType).to.equal('krappe')
      expect(parsedCmd.nickname).to.equal('krippe')
      expect(parsedCmd.message).to.equal('infernaalinen')
    })

    it('should not allow commands with wrong prefix', () => {
      expect(ircParser.resolve('foo', '.krappe')).to.be.false
    })

    it('should return false on empty message', () => {
      expect(ircParser.resolve('foo', '')).to.be.false
    })
  })
})
