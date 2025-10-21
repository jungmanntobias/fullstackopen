import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test person',
    url: 'test url',
    likes: 0,
    user: {
      username: 'testperson',
      name: 'test person',
      id: 'test'
    }
  }

  render(<Blog blog={blog} />)

  // Check title and author
  const titleAndAuthor = screen.getByText(/test title.*test person/, { exact: false })
  expect(titleAndAuthor).toBeVisible()

  // Check hidden parts
  const url = screen.getByText('url: test url')
  const likes = screen.getByText('likes: 0')
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})