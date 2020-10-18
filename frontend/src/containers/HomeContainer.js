import React, { useState } from 'react';
import GeoPlayer from '../components/mainPageComponents/GeoPlayer'

import ViewMap from './maps/ViewMap'
import 'react-spotify-auth/dist/index.css'

const HomeContainer = (props) =>{
    const [activePinList, setActivePinList] = useState('spotify:playlist:07r6MPm5464PGV1A4Yxh3V')

    return(
        <div>
            <h1> This is the Signed in container </h1>
            
            <ViewMap user={props.user} />
            {
                activePinList ? 
                (
                <GeoPlayer
                    playlist = {'spotify:playlist:07r6MPm5464PGV1A4Yxh3V'}
                 />
                
                )
                :
                (
                    null
                )
            }
        </div>
    );
};

export default HomeContainer;