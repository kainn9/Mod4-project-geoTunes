import React, {useState, useCallback, useRef, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import mapStyle from '../customCss/mapStyle';
import { SpotifyApiContext, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';
import { List, Segment, Button } from 'semantic-ui-react';
import ShowMap from "./maps/ShowMap";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,

} from '@react-google-maps/api';
import { formatRelative } from "date-fns";

import usePlacesAutoComplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import MapsDirectionsRenderer from './maps/MapsDirectionsRenderer';

import{
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import '../customCss/map.css';



const libraries = ['places'];

const mapContainerStyle = {
    width: '100vw',
    height: '84vh',
};

const center = {
    lat: 40.7128,
    lng: -74.0060,
};

const options  = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,

};



const InfoView = (props) => {

    

    const [spotToken, setSpotToken] = useState(localStorage.getItem('spotifyAuthToken'));
    
    useEffect(() => {
        setSpotToken(localStorage.getItem('spotifyAuthToken'));
    }, [])


    return(
        <div>
            <ShowMap showMarkers={props.showMarkers}/>
        <div id ='plContainer'>
                <NavLink to={`/routes/${props.routeID}`} > 
                    <Button primary>
                        Listen to Route
                    </Button>
                </NavLink>
            <SpotifyApiContext.Provider value={spotToken}> 
            <PlaylistTracks id={props.playlist.split(':')[2]}>
                {
                    (tracks) => {
                        if (tracks.data) {
                           let mappedTracks = tracks.data.items.map(track => (
                               <List.Content>
                                    <List.Header key={track.track.id}>
                                        {track.track.name}
                                    </List.Header>
                                    {console.log(track.track.artists[0].id)}
                                    <Artist id={track.track.artists[0].id}>
                                        {
                                            artist => {
                                                return artist.data ?   ` by ${artist.data.name}` : null
                                            }
                                        }

                                    </Artist>
                                </List.Content>
                            ))



                            return (
                                <Segment inverted>
                                    
                                    <Playlist id={props.playlist.split(':')[2]}>
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
                            )
                    
                        } else {
                            return <h2>Loading</h2>
                        }
                    }
                }
                   
                    
                        </PlaylistTracks>
            </SpotifyApiContext.Provider> 
            </div>
            </div>
    )

}

export default InfoView