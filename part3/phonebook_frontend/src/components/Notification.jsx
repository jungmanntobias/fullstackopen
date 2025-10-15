const Notification = ({message, color}) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    return (
        <div className='notification' style = {notificationStyle}>
            {message}
        </div>
    )
}

export default Notification