import React from 'react';
import './UsernameField.css';

import { FaStream } from 'react-icons/fa';

const UsernameField = ({ username, switchChannelsToggle }) => {
    return <section className='username-field-section'>
        <div className='channels-toggle' onClick={() => switchChannelsToggle()} ><FaStream /></div>
        <input type="text" { ...username } />
    </section>
}

export default UsernameField;