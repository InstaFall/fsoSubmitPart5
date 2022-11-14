import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Logout from './components/Logout'
import NewBlog from './components/NewBlog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ error: false, message: null })
  const [newBlog, setNewBlog] = useState(
    {
      title: "",
      author: "",
      url: ""
    })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser")
    if (loggedUser) {
      const parsedUser = JSON.parse(loggedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginService.login({ username, password })
      setUser(response)
      window.localStorage.setItem("loggedUser", JSON.stringify(response))
      setUsername("")
      setPassword("")
    } catch (exception) {
      setNotification({ error: true, message: "Invalid credentials!" })
      setTimeout(() => {
        setNotification({ error: false, message: null })
      }, 3000)
      setUsername("")
      setPassword("")
    }
  }

  const handleNewBlogSubmit = async (e) => {
    e.preventDefault()
    const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
    blogService.setToken(loggedUser.token)

    try {
    const response = await blogService.createBlog(newBlog)
    setBlogs([...blogs, response])
    setNewBlog({title:"",author:"",url:""})
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in</h2>
        <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLoginSubmit={handleLoginSubmit} />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Logout user={user} setUser={setUser} />
      <NewBlog newBlog={newBlog} setNewBlog={setNewBlog} handleNewBlogSubmit={handleNewBlogSubmit} />
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
