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
                describe('200:', () => {
                    it('accepts a body of {inc_votes: NUM}', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: 1 })
                            .expect(200)
                            .then(({ body: { article } }) => {
                                expect(article.votes).to.equal(101)
                            })
                    })
                    it('accepts negative values', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: -1 })
                            .expect(200)
                            .then(({ body: { article } }) => {
                                expect(article.votes).to.equal(99)
                            })
                    })
                    it('returns the updated article', () => {
                        return request(app)
                            .patch('/api/articles/1')
                            .send({ inc_votes: 1 })
                            .expect(200)
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
            describe('/comments', () => {
                describe('POST:', () => {
                    describe('201:', () => {
                        it('accepts a new comment with a username and body', () => {
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({
                                    username: 'icellusedkars',
                                    body: 'Just re-reading this article. What a beaut'
                                })
                                .expect(201)
                                .then(({ body: { comment } }) => {
                                    expect(comment).to.have.keys(
                                        'body',
                                        'author',
                                        'article_id',
                                        'votes',
                                        'created_at',
                                        'comment_id'
                                    )
                                    expect(comment.author).to.equal('icellusedkars')
                                    expect(comment.body).to.equal('Just re-reading this article. What a beaut')
                                    expect(comment.article_id).to.equal(1)
                                })
                        })
                        it('adds the comment to the comments table', () => {
                            // Can come back to this test when GET comments is implemented
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({
                                    username: 'icellusedkars',
                                    body: 'Just re-reading this article. What a beaut'
                                })
                                .expect(201)
                                .then(() => {
                                    return request(app)
                                        .get('/api/articles/1')
                                        .then(({ body: { article } }) => {
                                            expect(article.comment_count).to.equal(14)
                                        })
                                })
                        })
                    })
                    describe('400:', () => {
                        it('missing body', () => {
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({
                                    username: 'icellusedkars'
                                })
                                .expect(400)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('Bad request: missing vital data')
                                })
                        })
                        it('missing username', () => {
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({
                                    body: 'Just re-reading this article. What a beaut'
                                })
                                .expect(400)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('Bad request: missing username')
                                })
                        })
                        it('empty request', () => {
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({})
                                .expect(400)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('Bad request: missing username')
                                })
                        })
                        it('excess body data', () => {
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({
                                    username: 'icellusedkars',
                                    body: 'Just re-reading this article. What a beaut',
                                    votes: 500
                                })
                                .expect(400)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('Bad request: request can only contain {username, body}')
                                })
                        })
                        it('comment too long', () => {
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({
                                    username: 'icellusedkars',
                                    body: 'Just re-reading this article. What a beautiful construction. It has inspired me to write an article of my own, which I shall place here in the comments. Firstly, let me talk about the circumstances that lead me to post such an article, which shall itself hopefully be described by future readers as "a beaut"'
                                })
                                .expect(400)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('Bad request: body too long')
                                })
                        })
                        it('422: invalid username', () => {
                            return request(app)
                                .post('/api/articles/1/comments')
                                .send({
                                    username: 'isellusedcars',
                                    body: 'Just re-reading this article. What a beaut'
                                })
                                .expect(422)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('Unprocessable entity: data provided does not match the database')
                                })
                        })
                    })
                })
                describe('GET:', () => {
                    describe('200:', () => {
                        it('Returns an array of comments', () => {
                            return request(app)
                                .get('/api/articles/1/comments')
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments).to.be.an('Array')
                                    expect(comments).to.have.lengthOf(13)
                                })
                        })
                        it('Returns comments in the correct format', () => {
                            return request(app)
                                .get('/api/articles/1/comments')
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    comments.forEach(comment => {
                                        expect(comment).to.have.keys(
                                            'comment_id',
                                            'author',
                                            'votes',
                                            'created_at',
                                            'body'
                                        )
                                    })
                                })
                        })
                        it('defaults order to created_at (descending)', () => {
                            return request(app)
                                .get('/api/articles/1/comments')
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments[12].comment_id).to.equal(18)
                                })
                        })
                        it('accepts query to sort_by any column', () => {
                            return request(app)
                                .get('/api/articles/1/comments?sort_by=author')
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments[12].author).to.equal('butter_bridge')
                                    expect(comments[0].author).to.equal('icellusedkars')
                                })
                        })
                        it('accepts order query to set sort_by ascending/descending', () => {
                            return request(app)
                                .get('/api/articles/1/comments?sort_by=author&order=asc')
                                .expect(200)
                                .then(({ body: { comments } }) => {
                                    expect(comments[12].author).to.equal('icellusedkars')
                                    expect(comments[0].author).to.equal('butter_bridge')
                                })
                        })
                    })
                    describe('400:', () => {
                        it('invalid query column', () => {
                            return request(app)
                                .get('/api/articles/1/comments?sort_by=invalid_query')
                                .expect(400)
                                .then(({ body: { msg } }) => {
                                    expect(msg).to.equal('Bad request: one or more queried columns does not exist')
                                })
                        })
                    })
                })
            })
            describe('ERROR:', () => {
                it('405: unhandled methods', () => {
                    return request(app)
                        .delete('/api/articles/1/comments')
                        .expect(405)
                        .then(({ body: { msg } }) => {
                            expect(msg).to.equal('DELETE method not allowed')
                        })
                })
            })
        })
    })
})
