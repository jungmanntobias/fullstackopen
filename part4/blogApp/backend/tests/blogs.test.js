const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/testHelper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('number of blogs is as expected', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /json/)

  assert.strictEqual(result.body.length, helper.initialBlogs.length)
})

test('blog unique identifier property is named id', async () => {
    const result = await api.get('/api/blogs')

    const blog = result.body[0]

    assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, 'id'), true)
    assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, '_id'), false)
    assert.strictEqual(Object.prototype.hasOwnProperty.call(blog, '__v'), false)
})

after(async () => {
    await mongoose.connection.close()
})