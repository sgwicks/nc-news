const articlesRouter = require('express').Router()
const { getArticleById, patchArticleVoteCount } = require('../controllers/articles')
const { unhandledMethod } = require('../errors/errors')
const { postNewComment, getCommentsByArticle } = require('../controllers/comments')

articlesRouter.route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleVoteCount)
    .all(unhandledMethod)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticle)
    .post(postNewComment)
    .all(unhandledMethod)

module.exports = articlesRouter