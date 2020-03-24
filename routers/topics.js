const topicsRouter = require('express').Router()
const { getAllTopics } = require('../controllers/topics')
const { unhandledMethod } = require('../errors/errors')

topicsRouter.route('/')
    .get(getAllTopics)
    .all(unhandledMethod)

module.exports = topicsRouter
