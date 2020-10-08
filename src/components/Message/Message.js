import React from 'react';
import './Message.css';

const Message = ({message, username}) => {
    console.log(message)
    return <li className={`message-li message-li-${username === message.username && 'right'}`}>
        { username !== message.username && <span className='message-author'>{message.username}</span> }
        <span className='message-body'>{message.body}</span>
        <span className='message-date'>{message.createdat}</span>
    </li>
}

export default Message;