import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { User } from 'react-spotify-api'
import { PlaylistTracks } from 'react-spotify-api'


const GeoPlayer = (props) => {

    const testy = () => {
        fetch('https://api.spotify.com/v1')
        .then( r => r.json())
        .then(data => console.log(data))
    }

    return (
            
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

            <PlaylistTracks id={props.playlist.split(':')[2]}>
                {(tracks, loading, error) => (
                    tracks.data ? (
                        tracks.data.items.map(track => (
                            <h1 key={track.track.id}>{track.track.name}</h1>
                        ))
                    ) : null
                )}
            </PlaylistTracks>

            <SpotifyPlayer
                    uris={[props.playlist]}
                    name ='geoPlayer'
                    token={localStorage.getItem('spotifyAuthToken')}
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
    );
}

export default GeoPlayer