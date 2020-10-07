import React, { useState } from 'react';
import { socket } from '../../service/socket';

const AddChannelButton = () => {
    const [channelName, setChannelName] = useState('');
    const handleNameChange = (e) => {
        setChannelName(e.target.value)
    }
    const handleAddChannel = () => {
        if (!channelName) return;
        socket.emit('new channel', channelName.replace(' ', '-'));
        setChannelName('');
    }
    const handleCheckChars = (e) => {
        const allowedChars = /[0-9a-zA-Z\ ]/;
        if (!allowedChars.test(e.data) || (!channelName.length && e.data === ' ')) e.preventDefault();
    }
    return <div className='add-channel-button'>
        <input type="text" placeholder='Chanel name' value={channelName} onChange={handleNameChange} onBeforeInput={handleCheckChars} />
        <button onClick={handleAddChannel}>+</button>
    </div>
}

export default AddChannelButton;