const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
      {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      }  
    ]

const initialUsers = [
  {
    "username": "michael1",
    "password": "123456",
    "name": "Michael Chan",
  },
  {
    "username": "edsgerman",
    "password": "password1",
    "name": "Edsger W. Dijkstra"
  },
  {
    "username": "robert67",
    "password": "password",
    "name": "Robert C. Martin"
  }
]

const newBlog = {
        title: "test blog",
        author: "tobias jungmann",
        url: "https://test.com/",
        likes: 1,
      }

const newUser = {
        username: "marsa",
        password: "musti123",
        name: "marja-liisa"
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  // console.log(blogs.map(blog => blog.toJSON()))
  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  // console.log(blogs.map(blog => blog.toJSON()))
  return users.map(user => user.toJSON())
}

module.exports = {initialBlogs, newBlog, blogsInDB, initialUsers, usersInDB, newUser}