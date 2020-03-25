const commentsRouter = require('express').Router()
const { patchCommentVotes, deleteCommentbyId } = require('../controllers/comments')
const { unhandledMethod } = require('../errors/errors')

commentsRouter.route('/:comment_id')
    .patch(patchCommentVotes)
    .delete(deleteCommentbyId)
    .all(unhandledMethod)

module.exports = commentsRouter