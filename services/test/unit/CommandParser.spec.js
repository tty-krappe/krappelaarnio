const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

const CommandParser = require('../../modules/CommandParser')

describe('CommandParser', () => {
  describe('Telegram', () => {
    let telegramParser

    beforeEach(() => {
      telegramParser = new CommandParser('telegram')
    })

    it('should properly parse !naamat command', () => {
      const parsedCmd = telegramParser.resolve('arttu', '!naamat')
      expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'wasted',
        message: '',
        nickname: 'arttu'
      })
    })

    it('should reject promise on unrecognized command', () => {
      expect(telegramParser.resolve('laarnio', '!vittuvääräsuunta')).to.be.eventually.rejected
    })

    it('should properly parse !naamat aliases', () => {
      let parsedCmd = telegramParser.resolve('kukis', '!naamt')
      expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'wasted',
        message: '',
        nickname: 'kukis'
      })

      parsedCmd = telegramParser.resolve('masi', '!naamta')
      expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'wasted',
        message: '',
        nickname: 'masi'
      })
    })

    it('should properly parse !naamat command and additional message', () => {
      const parsedCmd = telegramParser.resolve('atte', '!naamat as fuck')
      expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'wasted',
        message: 'as fuck',
        nickname: 'atte'
      })
    })

    it('should not allow !krappe command in telegram', () => {
      expect(telegramParser.resolve('uusidiootti', '!krappe')).be.eventually.rejected
    })
  })

  describe('Irc', () => {
    let ircParser

    beforeEach(() => {
      ircParser = new CommandParser('irc')
    })

    it('should properly resolve !krappe command', () => {
      const parsedCmd = ircParser.resolve('krippe', '!krappe')
      expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'krappe',
        message: '',
        nickname: 'krippe'
      })
    })

    it('should properly resolve !krappe command and additional message', () => {
      const parsedCmd = ircParser.resolve('krippe', '!krappe infernaalinen')
      expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'krappe',
        message: 'infernaalinen',
        nickname: 'krippe'
      })
    })

    it('should not allow commands with wrong prefix', () => {
      expect(ircParser.resolve('foo', '.krappe')).be.eventually.rejected
    })

    it('should return false on empty message', () => {
      expect(ircParser.resolve('foo', '')).be.eventually.rejected
    })
  })
})
