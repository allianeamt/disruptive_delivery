import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../pictures/white_logo.png';

const Home = () => {
    const history = useHistory();
    return (
    <div>
        <div className="image-container"><img src={logo}/></div>

        <div className="image-container">
        <button class="Button" onClick={ () => {
            history.push('/trackOrder')
        }}> Track order</button>

        <button class="Button" onClick={ () => {
            history.push('/signIn')
        }}> Log in </button>
        </div>

    </div>
    )
};

export default Home;