import React from 'react';
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
    styles: mapStyle
};


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
                options={options}
            >
            </GoogleMap>
        </div>
    )
}

export default FullMap