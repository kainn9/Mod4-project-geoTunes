import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import ShowMap from './maps/ShowMap';
import Nav from '../components/mainPageComponents/Nav';
import SpotifyPlayer from 'react-spotify-web-playback';
import { User, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';
import { SpotifyApiContext } from 'react-spotify-api';


import { getUser, playroutes } from '../railsserver';
import { 
    Segment, 
    List ,
    Header,
    Icon,
    Button

} from 'semantic-ui-react'



const ProfileContainer = (props) => {
    
    const [updatedProfile, setUpdatedProfile] = useState(null);
    const [markers, setMarkers] = useState([]);
    const[playlist, setPlaylist] = useState('')
    useEffect(() => {
        fetch(getUser, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(foundProfile => { 
            console.log(foundProfile)
            setUpdatedProfile(foundProfile) 
        })     
    }, [])

    const previewRoute = (id) => {
        setPlaylistID(id)
        fetch(`${playroutes}/${id}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then(r => r.json())
        .then(route => {
            console.log(route)
                setMarkers(route.pins);
                setPlaylist(route.playlist);
            })
    }
    const [playlistID, setPlaylistID] = useState(null)
    return(
        <>
            <Nav user={props.user} />
            {
             
                updatedProfile ? 
                (
                <> 
                    <Header as='h2' icon>
                        <Icon name='globe' />
                        {updatedProfile.user.name}'s Profile 
                        <Header.Subheader>
                            click on any route title to preview
                        </Header.Subheader>
                     </Header>
                    <h2>My routes: </h2>
                    {console.log(updatedProfile.user)}
                    <ul>
                    {

                        updatedProfile.user.play_routes.map( (r, i) => {
                            return <li id={r.id} onClick={(e) => previewRoute(e.target.id)} key={r.id} >{ r.name }</li>
                        })
                    }
                    </ul>

                    <h2>Fav Routes:</h2>
                    <ul>
                    {

                        updatedProfile.user.routes.map( (r, i) => {
                            return <li id={r.id} onClick={(e) => previewRoute(e.target.id)} key={r.id} >{ r.name }</li>
                        })
                    }
                    </ul>
                    

                    <ShowMap showMarkers={markers} getCords={() => null} />
                    
                    <SpotifyApiContext.Provider value={localStorage.getItem('spotifyAuthToken')}> 
                    <PlaylistTracks id={playlist.split(':')[2]}>
                {
                    (tracks) => {
                        if (tracks.data) {
                            
                           let mappedTracks = tracks.data.items.map((track, i) => (
                               <List.Content key ={i}>
                                    <List.Header key={track.track.id}>
                                        {track.track.name}
                                    </List.Header>
                                
                                    <Artist id={track.track.artists[0].id}>
                                        {
                                            artist => {
                                                return artist.data ? ` by ${artist.data.name}` : null
                                            }
                                        }

                                    </Artist>
                                </List.Content>
                            ))



                            return (
                                <>
                                <NavLink to={`/routes/${playlistID}`} > 
                                    <Button primary>
                                        Listen to Route
                                    </Button>
                                </NavLink>

                                <Segment inverted>
                                    
                                    <Playlist id={playlist.split(':')[2]}>
                                        {
                                            playlist => {
                                             return playlist.data ? <h4>Playlist Name: {playlist.data.name}</h4> : null
                                            }
                                        }
                                    </Playlist>

                                    Songs:
                                    <List divided inverted relaxed>
                                        <List.Item>
                                                {mappedTracks}
                                        </List.Item>
                                    </List>
                                </Segment>
                            </>
                            )
                    
                        } else {
                            return <h2>Loading</h2>
                        }
                    }
                }
                   
                    
                        </PlaylistTracks>
                        </SpotifyApiContext.Provider>
                    
                    
                </>
                )
                :
                (
                    <h1>Loading</h1>
                )
                
            }
        </>
    )
}

export default ProfileContainer;