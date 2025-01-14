import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/login');
    };

    return (
        <div className='nf-container'>
            <h1 className='nf-heading'>404</h1>
            <p className='nf-message'>Oops! The page you're looking for doesn't exist.</p>
            <button className='nf-button' onClick={goHome}>
                Go Back Home
            </button>
        </div>
    );
};


export default NotFound;
