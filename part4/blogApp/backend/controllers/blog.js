const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(result)
})

blogRouter.post('/', userExtractor, async (request, response) => {
  const body = new Blog(request.body)

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const result = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  response.json(result)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const deleteId = request.params.id
  const user = request.user

  const blogToDelete = await Blog.findById(deleteId)
  
  if (!blogToDelete) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if (blogToDelete.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'token invalid' })
  }

  await blogToDelete.deleteOne()
  response.status(204).end()
})

module.exports = blogRouter