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
    lat: 40.7128,
    lng: -74.0060,
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
                zoom={12}
            >
            </GoogleMap>
        </div>
    )
}

export default FullMap