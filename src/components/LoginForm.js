const LoginForm = (props) => {
    const { handleSubmit, username, setUsername, password, setPassword } = props
    return (
        <form onSubmit={handleSubmit}>
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

export default LoginForm