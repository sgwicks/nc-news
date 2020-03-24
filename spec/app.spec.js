const { expect } = require('chai')
const request = require('supertest')
const app = require('../app')
const connection = require('../db/connection')

describe('/api', () => {
    beforeEach(() => connection.seed.run())
    after(() => connection.destroy())
    describe('/topics', () => {
        describe('GET', () => {
            describe('200:', () => {
                it('Returns an array of topic objects', () => {
                    return request(app)
                        .get('/api/topics')
                        .expect(200)
                        .then(topics => {
                            expect(topics).to.be.an('Array')
                        })
                })
            })
        })
    })
})