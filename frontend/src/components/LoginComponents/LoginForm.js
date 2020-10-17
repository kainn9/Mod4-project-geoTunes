import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Segment } from 'semantic-ui-react'

import LoginHeader from './LoginHeader';

import { SpotifyApiContext } from 'react-spotify-api'
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

const LoginForm  = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const token = localStorage.getItem('spotifyAuthToken')

    
    
    const updateState = (e) =>{
        switch(e.target.name) {
            case "username":
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break
        };
    };

    const handleUserInfo = (e) =>{
        e.preventDefault();
        let userObj = {
            username: username,
            password: password
        };

        props.loginHandler(userObj);
        setUsername('');
        setPassword('');
    };

    
    return(
        
        <Segment inverted id='loginSegment'>
            <Form inverted id = 'loginForm' onSubmit={handleUserInfo}>
                <LoginHeader />

                <Form.Group widths='equal'>
                
                    <Form.Input 
                        className='formText' 
                        type='text' 
                        fluid 
                        label='Username' 
                        placeholder='username' 
                        value={username} 
                        onChange={updateState} 
                        name="username"
                    />
                    <Form.Input 
                        className='formText' 
                        type='password' fluid label='password' 
                        placeholder='password' 
                        value={password} 
                        onChange={updateState} 
                        name="password"
                    />
                </Form.Group>
                <Form.Checkbox id='termsCheckBox' label='Link My Spotify Account' />
                <Button class = 'formBtn' type='Login'>Login</Button>
                <br></br>
                <Link to='/signUp' type ='button'>
                    <Button
                        id='registerBtn'
                        class = 'formbtn' 
                        type='SignUp'
                    >
                    Or Click to Register
                    </Button>
                </Link>
                <div>
                    {token ? 
                    (
                        <SpotifyApiContext.Provider value={token}>
                        {'e4a46774ea644f528544da64e917d641'}
                        <p>You are authorized with token: {token}</p>
                        </SpotifyApiContext.Provider>
                    ) 
                    :
                    (
                        // Display the login page
                        <SpotifyAuth
                        redirectUri='http://localhost:3001/'
                        clientID='4fc7bf448443478b8181ef1cc8d069ad'
                        scopes={[Scopes.userReadPrivate, 'user-read-email']} // either style will work
                        localStorage = {true}
                    />
                     )}
                </div>
     
                  
        
            </Form>
        </Segment>
    )
}

export default LoginForm