import { useState } from 'react';

export const useUsername = () => {
    const [username, setUsername] = useState(localStorage.getItem('username') || 'new-user');

    const handleChange = (e) => {
        setUsername(e.target.value)
        localStorage.setItem('username', e.target.value)
    };

    return {
        value: username,
        onChange: handleChange
    }
}