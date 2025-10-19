const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/testHelper')
const blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('HTTP requests work as intended', () => {

  test('number of blogs is as expected', async () => {
    const result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /json/)

    assert.strictEqual(result.body.length, helper.initialBlogs.length)
  })

  test('blog unique identifier property is named id', async () => {
      const result = await api.get('/api/blogs')
                              .expect(200)
                              .expect('Content-Type', /application\/json/)

      const blog = result.body[0]

      assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, 'id'), true)
      assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, '_id'), false)
      assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, '__v'), false)
  })

  test('post request creates a new blog post', async () => {
      const newBlog = helper.newBlog

      await api.post('/api/blogs')
              .send(newBlog)
              .expect(201)
              .expect('Content-Type', /application\/json/)

      const blogsAfter = await helper.blogsInDB()
      const authors = blogsAfter.map(b => b.author)
      assert.strictEqual(blogsAfter.length, helper.initialBlogs.length + 1)
      assert(authors.includes('tobias jungmann'))
  })

  test('missing likes-property defaults to 0', async () => {
      const { likes, ...newBlog } = helper.newBlog

      // console.log(newBlog)

      await api.post('/api/blogs')
              .send(newBlog)
              .expect(201)
              .expect('Content-Type', /application\/json/)

      const blogsAfter = await helper.blogsInDB()
      const addedBlog = blogsAfter.find(b => b.author === 'tobias jungmann')
      assert.strictEqual(addedBlog.likes, 0)
  })

  test('missing title or url-property leads to bad request', async () => {
      const { title, ...newBlogWithoutTitle } = helper.newBlog
      const { url, ...newBlogWithoutUrl } = helper.newBlog


      // console.log(newBlog)

      await api.post('/api/blogs')
              .send(newBlogWithoutTitle)
              .expect(400)

      await api.post('/api/blogs')
              .send(newBlogWithoutUrl)
              .expect(400)

      // const blogsAfter = await helper.blogsInDB()
      // const addedBlog = blogsAfter.find(b => b.author === 'tobias jungmann')
      // assert.strictEqual(addedBlog.likes, 0)
  })

  test('updating a blog works', async () => {
      const allBlogs = await helper.blogsInDB()
      const blogToUpdate = {...allBlogs[0], title: "modified title"}
      // console.log(blogToUpdate)

      await api.put(`/api/blogs/${blogToUpdate.id}`)
              .send(blogToUpdate)
              .expect(200)
              .expect('Content-Type', /application\/json/)

      const allBlogsAfter = await helper.blogsInDB()
      const titles = allBlogsAfter.map(b => b.title)

      assert.strictEqual(allBlogsAfter.length, allBlogs.length)
      // console.log(titles)
      // console.log(blogToUpdate)
      assert(titles.includes(blogToUpdate.title))
  })
  
  test('deleting a blog works', async () => {
      const allBlogs = await helper.blogsInDB()
      const blogToDelete = allBlogs[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`)
              .expect(204)

      const allBlogsAfter = await helper.blogsInDB()
      const titles = allBlogsAfter.map(b => b.title)

      assert.strictEqual(allBlogsAfter.length, allBlogs.length - 1)
      assert(!titles.includes(blogToDelete.title))
  })

})

after(async () => {
    await mongoose.connection.close()
})