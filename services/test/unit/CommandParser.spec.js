const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

const databasePopulate = require('../../utils/databasePopulate')

const CommandParser = require('../../modules/CommandParser')

describe('CommandParser', () => {
  describe('Telegram', () => {
    let telegramParser

    beforeEach(() => {
      telegramParser = new CommandParser('telegram')
    })

    it('should properly parse !naamat command', () => {
      const parsedCmd = telegramParser.resolve('arttu', '!naamat')
      return expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'wasted',
        message: '',
        nickname: 'arttu'
      })
    })

    it('should reject promise on unrecognized command', () => {
      return expect(telegramParser.resolve('laarnio', '!vittuvääräsuunta')).to.be.eventually.rejected
    })

    it('should properly parse !naamat aliases', () => {
      return Promise.all([
        expect(telegramParser.resolve('kukis', '!naamt')).to.eventually.deep.equal({
          actionType: 'wasted',
          message: '',
          nickname: 'kukis'
        }),

        expect(telegramParser.resolve('masi', '!naamta')).to.eventually.deep.equal({
          actionType: 'wasted',
          message: '',
          nickname: 'masi'
        })
      ])
    })

    it('should properly parse !naamat command and additional message', () => {
      const parsedCmd = telegramParser.resolve('atte', '!naamat as fuck')
      return expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'wasted',
        message: 'as fuck',
        nickname: 'atte'
      })
    })

    it('should not allow !krappe command in telegram', () => {
      return expect(telegramParser.resolve('uusidiootti', '!krappe')).be.eventually.rejected
    })
  })

  describe('Irc', () => {
    let ircParser

    beforeEach(() => {
      ircParser = new CommandParser('irc')
    })

    it('should properly resolve !krappe command', () => {
      const parsedCmd = ircParser.resolve('krippe', '!krappe')
      return expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'krappe',
        message: '',
        nickname: 'krippe'
      })
    })

    it('should properly resolve !krappe command and additional message', () => {
      const parsedCmd = ircParser.resolve('krippe', '!krappe infernaalinen')
      return expect(parsedCmd).to.eventually.deep.equal({
        actionType: 'krappe',
        message: 'infernaalinen',
        nickname: 'krippe'
      })
    })

    it('should not allow commands with wrong prefix', () => {
      return expect(ircParser.resolve('foo', '.krappe')).be.eventually.rejected
    })

    it('should return false on empty message', () => {
      return expect(ircParser.resolve('foo', '')).be.eventually.rejected
    })

    describe('Substances', () => {
      before(() => {
        return databasePopulate.populateSubstancesFromJson('../../data/test/substances.json')
      })

      it('should properly resolve !kalja command as substance usage', () => {
        const parsedCmd = ircParser.resolve('masi', '!kalja')
        return expect(parsedCmd).to.eventually.deep.equal({
          actionType: 'substanceAbuse',
          message: '',
          nickname: 'masi'
        })
      })

      it('should properly reject !kalja:D:D command as unrecognized', () => {
        const parsedCmd = ircParser.resolve('masi', '!kalja:D:D')
        return expect(parsedCmd).be.eventually.rejected
      })
    })
  })
})
