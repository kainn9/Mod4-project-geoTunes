import React from 'react';
import SpotifyAuthButton from '../components/mainPageComponents/SpotifyAuthButton'
import Nav from '../components/mainPageComponents/Nav';
import FullMap from './FullMap'

import 'react-spotify-auth/dist/index.css'

const SignedInContainer = (props) =>{

    return(
        <div>
            <h1> This is the Signed in container </h1>
            <Nav logOutHandler={props.logOutHandler} />
            <FullMap user={props.user} />
        </div>
    );
};

export default SignedInContainer;