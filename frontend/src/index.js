import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import App from './App';
import { SpotifyApiContext } from 'react-spotify-api';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(
   <BrowserRouter>
      
         <App props = {window} />
   </BrowserRouter>,
  document.getElementById('root')
);


serviceWorker.unregister();
