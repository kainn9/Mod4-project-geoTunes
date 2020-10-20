import React from 'react';

import ViewMap from './maps/ViewMap'
import 'react-spotify-auth/dist/index.css'

const HomeContainer = (props) =>{
   

    return(
        <div>
            <h1> Welcome {props.user.user.name} {console.log('currentUserInhomePageData:', props.user)} </h1>
            
            <ViewMap setPlayRoute={props.setPlayRoute} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>

        </div>
    );
};

export default HomeContainer;