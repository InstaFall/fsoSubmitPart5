const Notification = (props) => {
    const {notification} = props
    return ( 
        notification.error ?
        <p className="error">{notification.message}</p>
        :
        notification.message
    )
}

export default Notification