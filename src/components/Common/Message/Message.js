import React from 'react'
import './Message.css'

const Message = ( { children } : Props ) => {
    return (
        <div className="message-container">{children}</div>
    )
}

export default Message
