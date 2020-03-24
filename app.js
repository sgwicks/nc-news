const express = require('express')
const app = express()
const apiRouter = require('./routers/api')
const { handle500Errors } = require('./errors/errors')

app.use('/api', apiRouter)

app.use(handle500Errors)

module.exports = app