import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { socket } from '../../service/socket';
import AddChannelButton from '../AddChannelButton/AddChanelButton';
import './Chanels.css';

const Chanels = () => {
    const [channels, setChannels] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        socket.emit('load channels');
        setLoading(true);
    }, [])

    useEffect(() => {
        socket.on('channels loaded', channelsList => {
            setChannels(channelsList)
            setLoading(false)
        })

        socket.on('channel added', channel => setChannels(channels => [...channels, channel]))
    }, [])

    return <section className='chanels-section'>
        { 
            loading
            ? <p>Loading...</p>
            : <div>
                <AddChannelButton />
                <ul>
                    {
                        channels.length
                        ? channels.map((channel, i) => <li key={i}>
                            <Link to={`/${channel}`}>{channel.replace('-', ' ')}</Link>
                        </li>)
                        : 'There is no chanels'
                    }
                </ul>
            </div>
        }
    </section>
}

export default Chanels;