import React from 'react';
import { useParams } from 'react-router-dom';
import Message from '../Message/Message';
import './MessagesWindow.css';

const MessagesWindow = ({messages, loading, error, username}) => {  
    const { channel } = useParams();
    return loading
    ? <p>Loading...</p>
    : error
    ? <p>{error}</p>
    : <section className='messages-section'>
        {
            messages[channel] && messages[channel].length
            ? <ul className='messages-list'>
                {messages[channel].map((msg, i) => <Message username={username} message={msg} key={i} />)}
            </ul>
            : 'No messages yet!'
        }
    </section>
}

export default MessagesWindow;