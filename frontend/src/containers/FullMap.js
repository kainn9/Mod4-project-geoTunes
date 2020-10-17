import React from 'react';

import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,

} from '@react-google-maps/api';

const libraries = ['places']

const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}

const center = {
    lat: 43,
    lng: -79,
}


const FullMap = () => {
const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBMgD_XMTaESHuRTX8kdT05q_oB3ce84OI',
    libraries,
});

if (loadError) return 'Error Loading Maps';
if (!isLoaded) return 'Loading Maps';

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={8}
            >
            </GoogleMap>
        </div>
    )
}

export default FullMap