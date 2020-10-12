import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { socket } from '../../service/socket';
import AddChannelButton from '../AddChannelButton/AddChanelButton';
import Loader from '../Loader/Loader';
import './Chanels.css';

const Chanels = ({ toggle, switchChannelsToggle }) => {
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

    return <section className={`chanels-section ${!toggle && 'channels-section-hidden'}`}>
        { 
            loading
            ? <Loader />
            : <div>
                <AddChannelButton />
                <ul>
                    {
                        channels.length
                        ? channels.map((channel, i) => <li key={i}>
                            <NavLink 
                                to={`/${channel.name}`} 
                                onClick={() => switchChannelsToggle()}
                                activeClassName='selected'
                            >{channel.name.replace('-', ' ')}</NavLink>
                        </li>)
                        : 'There is no chanels'
                    }
                </ul>
            </div>
        }
    </section>
}

export default Chanels;