import React, { useState } from 'react';
import './NewMessageField.css';
import { socket } from '../../service/socket';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const NewMessageField = ({username}) => {

    const location = useLocation();

    const [message, setMessage] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        socket.on('signed request send', (signedRequest, url) => {
            fetch(signedRequest, {
                method: 'put',
                body: file
            })
            .then(response => {
                if (!response.ok) return Promise.reject('Error uploading file')
            })
            .catch(err => setError(err))
        })
    }, [])

    const handleChange = (e) => setMessage(e.target.value);

    const handleSend = () => {
        socket.emit('new message', { channel: location.pathname.slice(1), body: {username, message}});
        setMessage('')
    }

    const handleFileLoad = (e) => {
        const newFile = e.target.files[0];
        if (!newFile) {
            return setError('No file selected');
        }
        setFile(newFile);
        socket.emit('get signed request', newFile.name, newFile.type);
    };

    return location.pathname !== '/' && <section className='new-message-field-section'>
        {error && <p>{error}</p>}
        <input type="file" accept='image/png, image/jpeg' onChange={handleFileLoad}/>
        <input type='text' placeholder='Enter your message' value={message} onChange={handleChange}/>
        <button type='submit' onClick={handleSend}>Send</button>
    </section>
}

export default NewMessageField;