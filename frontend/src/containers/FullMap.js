import React, {useState} from 'react';
import '../customCss/map.css'
import mapStyle from '../customCss/mapStyle'
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,

} from '@react-google-maps/api';

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



const FullMap = (props) => {

const [markers, setMarkers] = useState([])

const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBMgD_XMTaESHuRTX8kdT05q_oB3ce84OI',
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
            
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={12}
                options={options}
                onClick={(event)=>{
                    setMarkers((current)=>[
                        ...current,
                        {
                            lat: event .latLng.lat(),
                            lng: event.latLng.lng(),
                            time: new Date(),
                    },
                ]);
                }}
                   
            >
                {markers.map(marker => <Marker key={marker.time.toISOString()} position={{lat: marker.lat, lng: marker.lng}} icon={{url:'/Sound-Wave-Headphones.svg'}}/>)}
            </GoogleMap>
        </div>
    )
}

export default FullMap