const chai = require('chai')
const expect = chai.expect

const CommandParser = require('../../modules/CommandParser')

describe('CommandParser', () => {
  describe('Telegram', () => {
    let telegramParser

    beforeEach(() => {
      telegramParser = new CommandParser('tg')
    })

    it('should properly resolve telegram message', () => {
      expect(telegramParser.resolve('arttu', 'value for life')).to.equal('tg: arttu > value for life')
    })
  })

  describe('Irc', () => {
    let ircParser

    beforeEach(() => {
      ircParser = new CommandParser('irc')
    })

    it('should properly resolve telegram message', () => {
      expect(ircParser.resolve('kukis', '!otanko')).to.equal('irc: kukis > !otanko')
    })
  })
})
