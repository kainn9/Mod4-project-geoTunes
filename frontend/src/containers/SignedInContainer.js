import React from 'react';
import { SpotifyApiContext } from 'react-spotify-api'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

const SignedInContainer = (props) =>{

    return(
        <div>
            <h1> This is the Signed in container </h1>
            <SpotifyAuth
                        title='beep boop bop'
                        redirectUri='http://localhost:3001/home'
                        clientID='4fc7bf448443478b8181ef1cc8d069ad'
                        scopes={[
                            'streaming', 
                            'user-read-email',
                            'user-read-private',
                            'user-read-playback-state',
                            'user-modify-playback-state',
                            'user-library-read',
                            'user-library-modify'

                        ]} 
                        localStorage = {true}
                        noCookie = {true}
                    />

            <button onClick = {() => props.logOutHandler()} >
                signOut
            </button>
        </div>
    );
};

export default SignedInContainer;