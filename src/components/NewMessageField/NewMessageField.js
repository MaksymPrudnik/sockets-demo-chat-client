import React, { useState } from 'react';
import './NewMessageField.css';
import { socket } from '../../service/socket';

const NewMessageField = ({username}) => {
    const [message, setMessage] = useState('');
    const handleChange = (e) => setMessage(e.target.value);
    const handleSend = () => {
        socket.emit('new message', {username, message});
        setMessage('')
    }
    return <section className='new-message-field-section'>
        <input type='text' placeholder='Enter your message' value={message} onChange={handleChange}/>
        <button type='submit' onClick={handleSend}>Send</button>
    </section>
}

export default NewMessageField;