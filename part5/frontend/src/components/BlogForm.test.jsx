import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('the form calls the evvent handles with right details when a new blog is created', async () => {

  const mockHandler = vi.fn()
  render(<BlogForm handleCreate={mockHandler}/>)
  const user = userEvent.setup()

  // change values of title, author and url
  const titleInput = screen.getByLabelText('title')
  const authorInput = screen.getByLabelText('author')
  const urlInput = screen.getByLabelText('url')
  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test person')
  await user.type(urlInput, 'test url')

  // click submit-button
  const addButton = screen.getByText('create')
  await user.click(addButton)

  // console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls[0][0].title).toBe('test title')
  expect(mockHandler.mock.calls[0][0].author).toBe('test person')
  expect(mockHandler.mock.calls[0][0].url).toBe('test url')

  expect(mockHandler.mock.calls).toHaveLength(1)
})