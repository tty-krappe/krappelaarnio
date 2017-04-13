const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

const databasePopulate = require('../../utils/databasePopulate')
const substanceController = require('../../controllers/SubstanceController')

describe('SubstanceController', () => {
  before(() => {
    return databasePopulate.populateSubstancesFromJson('../../data/test/substances.json')
  })

  it('should find substances by alias', () => {
    return Promise.all([
      expect(substanceController.findByAlias('bisse').omit(['id', 'aliases']).then((s) => s.toJSON())).to.eventually.deep.equal({
        substanceType: 'beer'
      }),

      expect(substanceController.findByAlias('olut').omit(['id', 'aliases']).then((s) => s.toJSON())).to.eventually.deep.equal({
        substanceType: 'beer'
      }),

      expect(substanceController.findByAlias('siideri').omit(['id', 'aliases']).then((s) => s.toJSON())).to.eventually.deep.equal({
        substanceType: 'cider'
      }),

      expect(substanceController.findByAlias('punkku').omit(['id', 'aliases']).then((s) => s.toJSON())).to.eventually.deep.equal({
        substanceType: 'redWine'
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
