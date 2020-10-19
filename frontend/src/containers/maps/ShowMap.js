import React, {useState, useCallback, useRef, useEffect} from 'react';
import { NavLink } from 'react-router-dom'
import mapStyle from '../../customCss/mapStyle';
import { SpotifyApiContext, Playlist, PlaylistTracks, Artist } from 'react-spotify-api';
import { List, Segment, Button } from 'semantic-ui-react';


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
import MapsDirectionsRenderer from './MapsDirectionsRenderer';


import{
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
import '../../customCss/map.css';
import {playroutes as playRoutes, users as userRoute, login as loginRoute} from './railsserver';


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


const ShowMap = (props) => {
    
    useEffect(() => {
        setMarkers(props.showMarkers)
    }, [props.showMarkers])

    const createPath = () => {
            let playRouteData = {
                playRouteData: markers,
                user: props.user.user,
                playlist: selectedPlaylist
            }
            
        fetch(playRoutes, {
            method: 'POST',
            headers: {
                Accepts: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(playRouteData)
        })
        .then()
        .then( () => {
            alert('Route Created')
            props.history.push('/home')
        })
    
    }

    

    const onMapClick = useCallback((event) => {
        let counter = 0
        if (counter < 5) {
            setMarkers((current)=>[
                ...current,
                {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng(),
                    time: new Date(),
            },
        ])
        counter += 1
    
        } else {
            alert('Max 5 Markers')
    };

    
    },[]) ; 

    const mapRef = useRef();

    const onMapLoad= useCallback((map)=>{
        mapRef.current=map; 
    },[])

    const panTo = useCallback(({lat, lng})=> {
        mapRef.current.panTo({lat, lng});
        mapRef.current.setZoom(14);
    },[]);

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDyHRdd4NQOPirfP_EtTiiK7TTHn1ySYZg',
        libraries
    });


    if (loadError) return 'Error Loading Maps';
    if (!isLoaded) return 'Loading Maps';

    return (
        <div>

            {
                props.user ? 
                (
                    <h1 id = 'mapHeader'>
                        Our App{" "} <span role='img' aria-label='arm'>🦾</span> 
                    </h1>
                )
                :
                (
                    null
                )
            }
            
            {/* <Locate panTo={panTo}/>  */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                options={options}
                onClick={onMapClick}
                onLoad={onMapLoad}
                   
            >
                {markers.map(marker => (
                    
                <Marker 
                key={marker.id} 
                position={{lat: marker.lat, lng: marker.lng}} 
                icon={{
                    url:'/Sound-Wave-Headphones.svg', 
                    scaledSize: new window.google.maps.Size(30,30), 
                    origin: new window.google.maps.Point(0,0), 
                    anchor: new window.google.maps.Point(15,15),
                    draggable: true,
                }}
                onClick={()=>{
                    setSelected(marker);
                    }}
                  />
                ))}
                {/* {markers.length>1 ? console.log("this is markers:", markers): null } */}
               {markers.length>1? <MapsDirectionsRenderer places={markers}/> : null} 
               

                {selected ? 
                (<InfoWindow position={{lat: selected.lat, lng: selected.lng }} onCloseClick={()=>{
                    setSelected(null);  
                }}>
                    <div>
                        <h2>
                            Playlist created at:
                        </h2>
                            <p> {formatRelative(selected.time, new Date())}</p>
                            <h2> cords:</h2>
                            <p>lat: {selected.lat}, lng:{selected.lng} </p>
                    </div>
                </InfoWindow>) : null}
            </GoogleMap>
            {/* {console.log(markers)} */}
            
        </div>
    );
}


// const Locate= ({panTo}) =>{
//     return (
//     <button className="locate" onClick={()=>{
//         navigator.geolocation.getCurrentPosition((position)=>{
//             panTo({
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//             });
//         }, () => null, options);
//     }}>
//         <img src="compass.svg" alt="compass - locate me"/>
//     </button>
//     );
// } 


export default ShowMap