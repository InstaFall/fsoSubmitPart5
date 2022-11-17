import { useState } from "react"

const Blog = ({ blog }) => {
  const [view, setView] = useState(false)
  const toggleView = () => {
    setView(!view)
  }
  return view ?
    <ul className="fullview">
      <li>Title: {blog.title} <button onClick={toggleView}>hide</button></li>
      <li>Author: {blog.author}</li>
      <li>Url: {blog.url}</li>
      <li>Likes: {blog.likes} <button>like</button></li>
      <li>id: {blog.id}</li>
    </ul>
    :
    <div>
      <b>{blog.title}</b> by {blog.author} <button onClick={toggleView}>view</button>
    </div>
}


export default Blog