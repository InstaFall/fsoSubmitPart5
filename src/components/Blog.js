import { useState } from 'react'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [view, setView] = useState(false)
  const toggleView = () => {
    setView(!view)
  }
  const username = JSON.parse(window.localStorage.getItem('loggedUser')).username

  return view ?
    <ul className="fullview">
      <li>Title: {blog.title} <button onClick={toggleView}>hide</button></li>
      <li>Author: {blog.author}</li>
      <li>Url: {blog.url}</li>
      <li>Likes: {blog.likes} <button onClick={() => likeBlog(blog)}>like</button></li>
      <li>id: {blog.id}</li>
      <li>User: {blog.user.username}</li>
      {username === blog.user.username && <button onClick={() => deleteBlog(blog)}>delete</button>}
    </ul >
    :
    <div>
      <b>{blog.title}</b> by {blog.author} <button onClick={toggleView}>view</button>
    </div>
}


export default Blog