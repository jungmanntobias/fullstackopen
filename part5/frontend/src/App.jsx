import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(true)
  const [user, setUser] = useState(null) 


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      setUsername('')
      setPassword('')
      

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
    } catch {
      setMessage('wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createBlog = async ({title, author, url}) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    await blogService.create(newBlog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setIsError(false)
    setMessage(`a new blog ${title} by ${author} added`)
    setTimeout(() => {
        setMessage(null)
      }, 5000)

  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message} isError={isError} />

        <form onSubmit={handleLogin}>
          <div>
            <label>
              username
              <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      
      <p>{user.name} logged in 
        <button type="submit" onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
          }}>
          log out
        </button>
      </p>

      <h2>create new</h2>
      <Notification message={message} isError={isError} />
      <Togglable buttonLabel="create new blog">
        <BlogForm handleCreate={createBlog}/>
      </Togglable>

      <h2>blogs</h2>
      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App