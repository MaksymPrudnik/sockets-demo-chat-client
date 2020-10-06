import React from 'react';
import Message from '../Message/Message';
import './MessagesWindow.css';

const MessagesWindow = ({messages, loading, error, username}) => {    
    return loading
    ? <p>Loading...</p>
    : error
    ? <p>{error}</p>
    : <section className='messages-section'>
        {
            messages.length
            ? <ul className='messages-list'>
                {messages.map((msg, i) => <Message username={username} message={msg} key={i} />)}
            </ul>
            : 'No messages yet!'
        }
    </section>
}

export default MessagesWindow;