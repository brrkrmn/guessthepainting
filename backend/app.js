const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const paintingsRouter = require('./controllers/paintings')
const middleware = require('./utils/middleware');

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/paintings', paintingsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app