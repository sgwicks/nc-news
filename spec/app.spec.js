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
        })
        describe('ERROR:', () => {
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
            })
            describe('ERROR:', () => {
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
    describe('/articles', () => {
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
                    it('returns an object with comment_count', () => {
                        return request(app)
                            .get('/api/articles/1')
                            .expect(200)
                            .then(({ body: { article } }) => {
                                expect(article.comment_count).to.equal(13)
                            })
                    })
                })
            })
            describe('PATCH:', () => {
                describe('201:', () => {
                    it('accepts a body of {inc_votes: NUM}', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: 1 })
                            .expect(201)
                            .then(({ body: { article } }) => {
                                expect(article.votes).to.equal(101)
                            })
                    })
                    it('accepts negative values', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: -1 })
                            .expect(201)
                            .then(({ body: { article } }) => {
                                expect(article.votes).to.equal(99)
                            })
                    })
                    it('returns the updated article', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: 1 })
                            .expect(201)
                            .then(({ body: { article } }) => {
                                expect(article.votes).to.equal(101)
                                expect(article).to.have.keys(
                                    'author',
                                    'title',
                                    'article_id',
                                    'body',
                                    'topic',
                                    'created_at',
                                    'votes'
                                    // comment_count?
                                )
                            })
                    })
                    it('updates the article in the database', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: 1 })
                            .then(() => {
                                return request(app)
                                    .get('/api/articles/1')
                                    .expect(200)
                                    .then(({ body: { article } }) => {
                                        expect(article.votes).to.equal(101)
                                    })
                            })
                    })
                })
                describe('400:', () => {
                    it('wrong body key', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_vote: 1 })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('Bad request: must use {inc_votes: NUM}')
                            })
                    })
                    it('invalid data type', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: 'one' })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('Bad request: invalid data type')
                            })
                    })
                    it('empty body', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({})
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('Bad request: must use {inc_votes: NUM}')
                            })
                    })
                    it('extra key on body', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: 1, title: 'Cheap handbags 4 sale' })
                            .expect(400)
                            .then(({ body: { msg } }) => {
                                expect(msg).to.equal('Bad request: only inc_votes is accepted')
                            })
                    })
                })
            })
            describe('ERROR:', () => {
                it('404: article doesn\'t exist', () => {
                    return request(app)
                        .get('/api/articles/234')
                        .expect(404)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('article doesn\'t exist')
                        })
                })
                it('400: invalid article id', () => {
                    return request(app)
                        .get('/api/articles/one')
                        .expect(400)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('Bad request: invalid data type')
                        })
                })
                it('405: invalid method', () => {
                    return request(app)
                        .post('/api/articles/1')
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('POST method not allowed')
                        })
                })
            })
        })
    })
})