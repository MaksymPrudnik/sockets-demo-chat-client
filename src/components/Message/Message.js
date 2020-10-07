import React from 'react';
import './Message.css';

const Message = ({message, username}) => {
    return <li className={`message-li message-li-${username === message.username && 'right'}`}>
        { username !== message.username && <span className='message-author'>{message.username}</span> }
        <span className='message-body'>{message.message}</span>
        <span className='message-date'>{message.createdAt}</span>
    </li>
}

export default Message;