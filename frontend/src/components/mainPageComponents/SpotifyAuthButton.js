import React from 'react';
import { SpotifyAuth } from 'react-spotify-auth';

const SpotifyAuthButton = (props) => (
  <SpotifyAuth
    title={props.header}
    redirectUri="http://localhost:3000/home"
    clientID={process.env.REACT_APP_SPOT}

    scopes={[
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-library-read',
      'user-library-modify',

    ]}

    localStorage
    noCookie
  />
);

export default SpotifyAuthButton;
