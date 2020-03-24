const usersRouter = require('express').Router()
const { getUserByUsername } = require('../controllers/users')
const { unhandledMethod } = require('../errors/errors')

usersRouter.route('/:username')
    .get(getUserByUsername)
    .all(unhandledMethod)

module.exports = usersRouter