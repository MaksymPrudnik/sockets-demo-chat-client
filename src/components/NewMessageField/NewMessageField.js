import React, { useState } from 'react';
import './NewMessageField.css';
import { socket } from '../../service/socket';
import { useLocation } from 'react-router-dom';

import { BsPaperclip } from 'react-icons/bs';

const HOST = process.env.REACT_APP_HOST || 'http://localhost:5000';

const NewMessageField = ({username}) => {

    const location = useLocation();

    const [message, setMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
    const [fileValue, setFileValue] = useState('');

    const clearFile = () => {
        setFileValue('');
        setImageUrl('');
    }

    const sendFileToS3 = (signedRequest, url, file) =>  {
        fetch(signedRequest, {
            method: 'put',
            body: file
        })
        .then(response => {
            if (!response.ok) return Promise.reject('Error uploading file')
        })
        .catch(err => setError(err.message || err.toString()))
        .finally(() => setImageUrl(url))
    }

    const handleChangeMessage = (e) => setMessage(e.target.value);

    const handleSend = () => {
        socket.emit('new message', { channel: location.pathname.slice(1), body: {username, message, img: imageUrl}});
        setMessage('');
        clearFile();
    }

    const handleFileLoad = (e) => {
        setFileValue(e.target.value);
        const newFile = e.target.files[0];
        if (!newFile.type) {
            clearFile();
            return setError('Allowed types: png, jpeg');
        }
        if (!newFile) {
            return setError('No file selected');
        }
        fetch(`${HOST}/sign-s3?file-name=${newFile.name}&file-type=${newFile.type}`)
        .then(response => {
            if (!response.ok) return Promise.reject('Unable to get S3 URL')
            return response.json()
        })
        .then(({signedRequest, url}) => sendFileToS3(signedRequest, url, newFile))
        .catch(err => setError(err))
    };

    return location.pathname !== '/' && <section className='new-message-field-section'>
        {error && <p>{error}</p>}
        {imageUrl && <a href={imageUrl} target='_blank' rel="noopener noreferrer" >{fileValue.slice(12)}</a> }
        <div className='new-message-inputs'>
            <input type='text' placeholder='Enter your message' className='message-text' value={message} onChange={handleChangeMessage}/>
            <label className='message-file-input'>
                <BsPaperclip />
                <input 
                    type="file" 
                    accept='image/png, image/jpeg' 
                    onChange={handleFileLoad} 
                    value={fileValue}
                />
            </label>
            <button type='submit' onClick={handleSend}>Send</button>
        </div>
    </section>
}

export default NewMessageField;