const express = require('express')
const app = express()
const apiRouter = require('./routers/api')
const { handleCustomErrors, handle400Errors, handle500Errors } = require('./errors/errors')

app.use('/api', apiRouter)

// ERROR HANDLING

app.use(handleCustomErrors)
app.use(handle400Errors)
app.use(handle500Errors)

module.exports = app