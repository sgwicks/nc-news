const topicsRouter = require('express').Router()
const { getAllTopics, unhandledMethod } = require('../controllers/topics')

topicsRouter.route('/')
    .get(getAllTopics)
    .all(unhandledMethod)

module.exports = topicsRouter
