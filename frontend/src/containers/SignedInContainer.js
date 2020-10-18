import React, { useState } from 'react';
import GeoPlayer from '../components/GeoPlayer'
import Nav from '../components/mainPageComponents/Nav';
import FullMap from './FullMap'
import 'react-spotify-auth/dist/index.css'

const SignedInContainer = (props) =>{
    const [activePinList, setActivePinList] = useState('spotify:playlist:07r6MPm5464PGV1A4Yxh3V')

    return(
        <div>
            <h1> This is the Signed in container </h1>
            <Nav logOutHandler={props.logOutHandler} />
            <FullMap user={props.user} />
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

export default SignedInContainer;