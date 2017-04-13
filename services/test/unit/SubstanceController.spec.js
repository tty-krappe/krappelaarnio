const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))
chai.use(require('chai-shallow-deep-equal'))

const databasePopulate = require('../../utils/databasePopulate')
const substanceController = require('../../controllers/SubstanceController')

describe('SubstanceController', () => {
  before(() => {
    return databasePopulate.populateSubstancesFromJson('../../data/test/substances.json')
  })

  it('should find substances by alias', () => {
    return Promise.all([
      expect(substanceController.findByAlias('bisse')).to.eventually.shallowDeepEqual({
        substanceType: 'beer',
        aliases: [
          'olut',
          'kalja',
          'bisse'
        ]
      }),

      expect(substanceController.findByAlias('olut')).to.eventually.shallowDeepEqual({
        substanceType: 'beer',
        aliases: [
          'olut',
          'kalja',
          'bisse'
        ]
      }),

      expect(substanceController.findByAlias('siideri')).to.eventually.shallowDeepEqual({
        substanceType: 'cider',
        aliases: [
          'siideri',
          'sidukka'
        ]
      }),

      expect(substanceController.findByAlias('punkku')).to.eventually.shallowDeepEqual({
        substanceType: 'redWine',
        aliases: [
          'punkku',
          'punaviini'
        ]
      })
    ])
  })

  it('should return null when substance alias is not found', () => {
    return Promise.all([
      expect(substanceController.findByAlias('biss')).to.eventually.be.undefined,
      expect(substanceController.findByAlias('siideri!')).to.eventually.be.undefined
    ])
  })
})
