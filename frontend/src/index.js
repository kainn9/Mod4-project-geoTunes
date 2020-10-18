import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { SpotifyApiContext } from 'react-spotify-api';
import * as serviceWorker from './serviceWorker';


import { BrowserRouter } from 'react-router-dom';
import { get } from 'js-cookie';

ReactDOM.render(
   <BrowserRouter>
      <SpotifyApiContext.Provider value={localStorage.getItem('spotifyAuthToken')}>
         <App props = {window} />
      </SpotifyApiContext.Provider>
   </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();
