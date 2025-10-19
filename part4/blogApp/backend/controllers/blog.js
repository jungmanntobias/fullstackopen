const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRouter.get('/', async (request, response) => {
  const result = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(result)
})

blogRouter.post('/', async (request, response) => {
  const body = new Blog(request.body)
  const user = await User.findOne() // findOneById(body.userId)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid'})
  }

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

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogRouter