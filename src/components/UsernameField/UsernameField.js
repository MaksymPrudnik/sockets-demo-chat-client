import React from 'react';
import './UsernameField.css';

const UsernameField = ({ username }) => {
    return <section className='username-field-section'>
        <input type="text" { ...username } />
    </section>
}

export default UsernameField;