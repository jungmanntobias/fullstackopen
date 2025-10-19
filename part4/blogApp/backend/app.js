require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')

const app = express()

mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI
logger.info('connecting to', url)
mongoose
  .connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.info('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app