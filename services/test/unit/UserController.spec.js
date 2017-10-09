const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

const databasePopulate = require('../../utils/databasePopulate')
const userController = require('../../controllers/UserController')

describe('UserController', () => {
  before(() => {
    return databasePopulate.populateUsersFromJson('../../data/test/users.json')
  })

  it('should find users by nickname or alias', () => {
    return Promise.all([
      expect(userController.findUser('arttu')).to.eventually.have.deep.property('nickname', 'arthos'),
      expect(userController.findUser('arthos')).to.eventually.have.deep.property('nickname', 'arthos'),
      expect(userController.findUser('arthos_')).to.eventually.have.deep.property('nickname', 'arthos'),
      expect(userController.findUser('spott')).to.eventually.have.deep.property('nickname', 'spott')
    ])
  })

  it('should return null when user id or alias is not found', () => {
    return Promise.all([
      expect(userController.findUser('spotti')).to.eventually.be.undefined,
      expect(userController.findUser('artturi')).to.eventually.be.undefined
    ])
  })
})

