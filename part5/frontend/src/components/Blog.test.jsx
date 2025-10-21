import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('after clicking the button, url and likes are displayed', async () => {
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

  const user = userEvent.setup()
  const button = screen.getByText('view', { exact: false })
  await user.click(button)

  const url = screen.getByText('url: test url')
  const likes = screen.getByText('likes: 0')
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})