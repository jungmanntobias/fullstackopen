import { useState } from 'react'

const Blog = (props) => {
  const blog = props.blog
  const blogStyle = {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState("view")

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLabel(visible ? "view" : "hide")
  }

  return (
    <div style={blogStyle}>
      <p style={{ margin: 0 }}>{blog.title}: {blog.author} <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      <div style={showWhenVisible}>
        <p style={{ margin: 0 }}>url: {blog.url}</p>
        <p style={{ margin: 0 }}>likes: {blog.likes} <button onClick={() => props.handleLike(blog)}>like</button></p>
        <p style={{ margin: 0 }}>user: {blog.user.name}</p>
        <button onClick={() => props.handleDelete(blog)}>delete</button>
      </div>
    </div>
  )
}

export default Blog