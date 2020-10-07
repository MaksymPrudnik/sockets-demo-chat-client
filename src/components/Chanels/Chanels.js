import React from 'react';
import { Link } from 'react-router-dom';
import AddChannelButton from '../AddChannelButton/AddChanelButton';
import './Chanels.css';

const Chanels = ({chanels, setChanels}) => {
    return <section className='chanels-section'>
        <AddChannelButton />
        <ul>
            {
                chanels.length
                ? chanels.map((channel, i) => <li key={i}><Link to={`/${channel}`}>{channel.replace('-', ' ')}</Link></li>)
                : 'There is no chanels'
            }
        </ul>
    </section>
}

export default Chanels;