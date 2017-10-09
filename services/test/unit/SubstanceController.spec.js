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
      expect(substanceController.findByAlias('bisse')).to.eventually.have.deep.property('substanceType', 'beer'),
      expect(substanceController.findByAlias('olut')).to.eventually.have.deep.property('substanceType', 'beer'),
      expect(substanceController.findByAlias('siideri')).to.eventually.have.deep.property('substanceType', 'cider'),
      expect(substanceController.findByAlias('punkku')).to.eventually.have.deep.property('substanceType', 'redWine')
    ])
  })

  it('should return null when substance alias is not found', () => {
    return Promise.all([
      expect(substanceController.findByAlias('biss')).to.eventually.be.undefined,
      expect(substanceController.findByAlias('siideri!')).to.eventually.be.undefined
    ])
  })
})
