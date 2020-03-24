const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const connection = require('../db/connection')

beforeEach(() => connection.seed.run())
after(() => connection.destroy())

describe('/api', () => {
    describe('/topics', () => {
        describe('GET', () => {
            describe('200:', () => {
                it('Returns an array of topic objects', () => {
                    return request(app)
                        .get('/api/topics')
                        .expect(200)
                        .then(({ body: { topics } }) => {
                            expect(topics).to.be.an('Array')
                            expect(topics[0]).to.have.keys('slug', 'description')
                        })
                })
            })
            describe('405:', () => {
                it('Returns a 405 error on unhandled methods', () => {
                    return request(app)
                        .post('/api/topics')
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('Method not allowed')
                        })
                })
            })
        })
    })
    describe.only('/users', () => {
        describe('/:username', () => {
            describe('GET', () => {
                describe('200:', () => {
                    it('Returns a user object from a username', () => {
                        return request(app)
                            .get('/api/users/icellusedkars')
                            .expect(200)
                            .then(({ body: { user } }) => {
                                expect(user.username).to.equal('icellusedkars')
                                expect(user).to.have.keys(
                                    'username',
                                    'avatar_url',
                                    'name'
                                )
                            })
                    })
                })
            })
        })
    })
})