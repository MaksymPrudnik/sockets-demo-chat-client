import React from 'react';
import { socket } from '../../service/socket';

const LoadMoreMessagesButton = ({count, channel}) => {
    const handleLoadMore = () => {
        console.log(count)
        socket.emit('load messages', {count, channel});
    }
    return <button 
        style={{border: 'none',
        backgroundColor: 'transparent', 
        textDecoration: 'underline'}}
        onClick={handleLoadMore}
     >Load more</button>
}

export default LoadMoreMessagesButton;