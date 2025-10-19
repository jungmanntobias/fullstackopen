const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter