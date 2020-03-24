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
            describe('400:', () => {
                it('405: unhandled methods', () => {
                    return request(app)
                        .post('/api/topics')
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('POST method not allowed')
                        })
                })
            })
        })
    })
    describe('/users', () => {
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
                describe('400:', () => {
                    it('404: user doesn\'t exist', () => {
                        return request(app)
                            .get('/api/users/samtheman')
                            .expect(404)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('username samtheman not found')
                            })
                    })
                    it('405: undhandled methods', () => {
                        return request(app)
                            .patch('/api/users/icellusedkars')
                            .expect(405)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('PATCH method not allowed')
                            })
                    })
                })
            })
        })
    })
    describe.only('/articles', () => {
        describe('/:article_id', () => {
            describe('GET:', () => {
                describe('200:', () => {
                    it('returns an article object', () => {
                        return request(app)
                            .get('/api/articles/1')
                            .expect(200)
                            .then(({ body: { article } }) => {
                                expect(article).to.include.keys(
                                    'author',
                                    'title',
                                    'article_id',
                                    'body',
                                    'topic',
                                    'created_at',
                                    'votes'
                                )
                            })
                    })
                })
            })
        })
    })
})