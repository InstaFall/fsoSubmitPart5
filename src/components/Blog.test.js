import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const testBlog = {
  title: 'Title is rendered',
  author: 'Author is rendered',
  url: 'http://example.org',
  likes: 28,
  user: { username: 'zoooort' }
}

test('Blog component displays title and author but not url or likes',async () => {
  const container = render(<Blog blog={testBlog} />).container

  await screen.getByText('Title is rendered',{ exact: false })
  await screen.getByText('Author is rendered', { exact:false })
  const likes = container.querySelector('#blogLikes')
  const url = container.querySelector('#blogUrl')
  screen.debug()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test('Blog url and likes are displayed after clicking show', async () => {
  const user = userEvent.setup()
  render(<Blog blog={testBlog} />).container
  const viewButton = screen.getByText('view')
  const likes = screen.queryByText('Likes:', { exact:false })
  expect(likes).toBeNull()
  await user.click(viewButton)
  screen.debug()
  screen.getByText('Likes:', { exact:false })
  screen.getByText('Url:', { exact:false })
})