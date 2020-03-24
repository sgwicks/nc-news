const articlesRouter = require('express').Router()
const { getArticleById, patchArticleVoteCount } = require('../controllers/articles')
const { unhandledMethod } = require('../errors/errors')

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleVoteCount)
    .all(unhandledMethod)

module.exports = articlesRouter