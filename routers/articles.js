const articlesRouter = require('express').Router()
const { getArticleById } = require('../controllers/articles')
const { unhandledMethod } = require('../errors/errors')

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .all(unhandledMethod)

module.exports = articlesRouter