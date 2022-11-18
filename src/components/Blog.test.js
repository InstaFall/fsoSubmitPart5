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

test('Blog component displays title and author but not url or likes', () => {
  const container = render(<Blog blog={testBlog} />).container

  screen.findByText('Title is rendered')
  screen.findByText('Author is rendered')
  const likes = container.querySelector('#blogLikes')
  const url = container.querySelector('#blogUrl')
  screen.debug()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})