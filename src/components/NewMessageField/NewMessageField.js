import React, { useState } from 'react';
import './NewMessageField.css';
import { socket } from '../../service/socket';
import { useLocation } from 'react-router-dom';

const NewMessageField = ({username}) => {

    const location = useLocation();

    const [message, setMessage] = useState('');
    const handleChange = (e) => setMessage(e.target.value);
    const handleSend = () => {
        socket.emit('new message', { channel: location.pathname.slice(1), body: {username, message}});
        setMessage('')
    }
    return location.pathname !== '/' && <section className='new-message-field-section'>
        <input type='text' placeholder='Enter your message' value={message} onChange={handleChange}/>
        <button type='submit' onClick={handleSend}>Send</button>
    </section>
}

export default NewMessageField;