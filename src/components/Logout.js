const Logout = (props) => {
    const {user, setUser} = props
    const handleLogout = () => {
        window.localStorage.clear()
        setUser(null)
    }
    return ( 
        <div>
        <b>{user.username}</b> logged in <button onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Logout