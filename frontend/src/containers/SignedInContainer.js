import React from 'react';
import SpotifyAuthButton from '../components/mainPageComponents/SpotifyAuthButton'
import Nav from '../components/mainPageComponents/Nav';

import 'react-spotify-auth/dist/index.css'

const SignedInContainer = (props) =>{

    return(
        <div>
            <h1> This is the Signed in container </h1>
            <Nav />
            <button onClick = {() => props.logOutHandler()} >
                signOut
            </button>
        </div>
    );
};

export default SignedInContainer;