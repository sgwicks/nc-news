const commentsRouter = require('express').Router()
const { patchCommentVotes } = require('../controllers/comments')
const { unhandledMethod } = require('../errors/errors')

commentsRouter.route('/:comment_id')
    .patch(patchCommentVotes)
    .all(unhandledMethod)

module.exports = commentsRouter