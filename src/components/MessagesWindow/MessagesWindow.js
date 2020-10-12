import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { socket } from '../../service/socket';
import LoadMoreMessagesButton from '../LoadMoreMessagesButton/LoadMoreMessagesButton';
import Message from '../Message/Message';
import './MessagesWindow.css';

const MessagesWindow = ({username}) => {  
    const { channel } = useParams();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        socket.emit('load messages', {count: 0, channel});
        setLoading(true);

        return setMessages([]);
    }, [channel])

    const addLoadedMessages = (newMessages) => {
        setMessages(messages => [ ...newMessages, ...messages ])
        setLoading(false)
    }

    const addMessage = (message) => {
        if (channel !== message.channel) return;
        setMessages(messages => [...messages, message])
        scrollToBottom();
    }

    const addError = err => {
        setError(err);
        setLoading(false)
    }

    useEffect(() => {
        socket.on('messages loaded', addLoadedMessages)

        socket.on('message added', addMessage)

        socket.on('load messages fail', addError)

        return () => {
            socket.off('messages loaded',  addLoadedMessages);
            socket.off('message added', addMessage)
            socket.off('load messages fail', addError)
        }
    }, [channel])

    return <section className='messages-section'>
        {
            loading
            ? <p>Loading...</p>
            : error
            ? <p>{(error === 'No such channel' && <Redirect to='/' />) || error}</p>
            : <div className='messages-section-div'>
                { messages.length !== 0 && <LoadMoreMessagesButton count={messages.length} channel={channel} />}
                {
                    messages.length
                    ? <ul className='messages-list'>
                        {messages.map((msg, i) => <Message username={username} message={msg} key={i} />)}
                    </ul>
                    : 'No messages yet!'
                }
            </div>
        }
    </section>
}

export default MessagesWindow;

function scrollToBottom() {
    const messagesList = document.querySelector('.messages-list');
    if (Boolean(messagesList)) {
      messagesList.scrollTo({top: messagesList.scrollHeight, behavior: 'smooth'});
    }
}