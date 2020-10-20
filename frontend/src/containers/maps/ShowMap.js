import React, {useState, useCallback, useRef, useEffect} from 'react';
import mapStyle from '../../customCss/mapStyle';


import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,

} from '@react-google-maps/api';
import { formatRelative } from "date-fns";
import MapsDirectionsRenderer from './MapsDirectionsRenderer';
import "@reach/combobox/styles.css";
import '../../customCss/map.css';

//import { playroutes as playRoutes } from '../../railsserver'
//import{
    //     Combobox,
    //     ComboboxInput,
    //     ComboboxPopover,
    //     ComboboxList,
    //     ComboboxOption,
    // } from "@reach/combobox";

    // import usePlacesAutoComplete, {
//     getGeocode,
//     getLatLng,
// } from "use-places-autocomplete";

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

    // const panTo = useCallback(({lat, lng})=> {
    //     mapRef.current.panTo({lat, lng});
    //     mapRef.current.setZoom(14);
    // },[]);

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

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
                {markers.map((marker, i) => (
                    
                <Marker 
                draggable={props.draggableVal}
                key={i} 
                id={i}
                position={{lat: marker.lat, lng: marker.lng}}
                //draggable= {true}
                icon={{
                    url:'/Sound-Wave-Headphones.svg', 
                    scaledSize: new window.google.maps.Size(30,30), 
                    origin: new window.google.maps.Point(0,0), 
                    anchor: new window.google.maps.Point(15,15),
                   
                }}
                // onClick={()=>{
                //     setSelected(marker);
                //     }}

                    onDragEnd={(e) => {
                        // console.log(marker.lat);
                        // console.log(e.latLng.lat());
                        // console.log(e.latLng.lng());
                        marker.lat = e.latLng.lat();
                        marker.lng = e.latLng.lng();
                        let updatedMarkers = [...markers];
                        updatedMarkers[marker.id] = marker
                        setMarkers(updatedMarkers);
                        
                    }}
                  />
                ))}
                {/* {markers.length>1 ? console.log("this is markers:", markers): null } */}
               {markers.length>1? <MapsDirectionsRenderer getCords={props.getCords}
                   places={markers}
                    
                    /> : null} 
            
               

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
            {/* {console.log('att the bottom fresh render', markers)} */}
            
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