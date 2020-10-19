import React, { useState, useEffect } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { User } from 'react-spotify-api'
import { PlaylistTracks } from 'react-spotify-api'
import { SpotifyApiContext } from 'react-spotify-api';


const GeoPlayer = (props) => {

    const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

    useEffect(() => setToken(localStorage.getItem('spotifyAuthToken'))
    ,[])

    return (
            
        token ? 
        (
            <>
                <User>
                    {(user, loading, error) =>
                        user.data ? (
                            <ul>
                                <li>Name - {user.data.display_name}</li>
                                <li>ID - {user.data.id}</li>
                            </ul>
                        ) : null
                    }
                </User>
                <SpotifyApiContext.Provider value={token}> 
                <PlaylistTracks id={props.playlist.split(':')[2]}>
                    {(tracks, loading, error) => (
                        tracks.data ? (
                            tracks.data.items.map(track => (
                                    <h1 key={track.track.id}>{track.track.name}</h1>
                            ))
                        ) 
                        : 
                        null
                    )}
                        </PlaylistTracks>
                        </SpotifyApiContext.Provider>

                        <SpotifyPlayer
                            uris={[props.playlist]}
                            name ='geoPlayer'
                            token={token}
                            styles={{
                                bgColor: '#2FA0B1',
                                color: '#fff',
                                loaderColor: '#fff',
                                sliderColor: '#1cb954',
                                savedColor: '#fff',
                                trackArtistColor: '#ccc',
                                trackNameColor: '#fff',
                            }}
        
                        />
                        
                    </>
            )
            :
            (
                null
            )
            
            
       
    )
    
}

export default GeoPlayer