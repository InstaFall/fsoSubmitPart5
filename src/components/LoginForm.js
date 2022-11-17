import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const { handleLoginSubmit, username, setUsername, password, setPassword } = props
  return (
    <form onSubmit={handleLoginSubmit}>
      <div>
                username: <input type="text" name="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
      </div>
      <div>
                password: <input type="password" name="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLoginSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm