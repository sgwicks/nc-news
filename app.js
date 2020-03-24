const express = require('express')
const app = express()
const apiRouter = require('./routers/api')

app.use('/api', apiRouter)

module.exports = app