import React, { useState } from 'react';
import GeoPlayer from '../components/mainPageComponents/GeoPlayer'

import ViewMap from './maps/ViewMap'
import 'react-spotify-auth/dist/index.css'

const HomeContainer = (props) =>{
    const [currentPlaylist, setCurrentPlayList] = useState('')

    const setPlayer = (marker) => {
        setCurrentPlayList(marker);
    }
    return(
        <div>
            <h1> This is the Signed in container </h1>
            
            <ViewMap setPlayRoute={props.setPlayRoute} setPlayer ={setPlayer} history={props.history} user={props.user}  logOutHandler={props.logOutHandler}/>
            {/* {
                currentPlaylist ? 
                (
                    <GeoPlayer
                    playlist = {currentPlaylist}
                 />
                
                )
                :
                (
                    null
                )
            } */}
        </div>
    );
};

export default HomeContainer;