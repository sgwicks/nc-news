const commentsRouter = require('express').Router()
const { postNewComment } = require('../controllers/comments')

commentsRouter.route('/')
    .post(postNewComment)

module.exports = commentsRouter