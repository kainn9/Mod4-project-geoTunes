import React from 'react';

import ViewMap from './maps/ViewMap'
import 'react-spotify-auth/dist/index.css'

const HomeContainer = (props) =>{
   

    return(
        <div>
            <h1> This is the Signed in container </h1>
            
            <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>

        </div>
    );
};

export default HomeContainer;