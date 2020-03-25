const express = require('express')
const app = express()
const apiRouter = require('./routers/api')
const { handleCustomErrors, handle404Errors, handle400Errors, handle500Errors } = require('./errors/errors')

app.use(express.json())

// ROUTING

app.use('/api', apiRouter)

// INVALID ROUTES

app.all('/*', handle404Errors)

// ERROR HANDLING

app.use(handleCustomErrors)
app.use(handle400Errors)
app.use(handle500Errors)

module.exports = app