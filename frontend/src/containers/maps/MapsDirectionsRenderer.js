import { DirectionsRenderer } from '@react-google-maps/api';
import React,{useState, useEffect, useRef } from 'react';


/* global google */

function MapDirectionsRenderer(props) {
  console.log(props)
    const [directions, setDirections] = useState(null);
    const [error, setError] = useState(null);
    
  const didMountRef = useRef()
  
    useEffect(() => {
      
      const {places} = props;
      console.log(places)
      const waypoints = places.map(p => ({
        location: { lat: p.lat, lng: p.lng},

      }));
      
      console.log(waypoints)
      const origin = waypoints.shift().location;
      const destination = waypoints.pop().location;
    
      const directionsService = new google.maps.DirectionsService();
      const routeValues=    {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: waypoints
      }
        
      

      directionsService.route( routeValues
     ,
        (result, status) => {
          console.log(result)
          if (status === google.maps.DirectionsStatus.OK) {
            if(result!==directions) setDirections(result);
          } else {
            setError(result);
          }
        }
      );
    }, [props.places]);
  
    if (error) {
      return <h1>{error}</h1>;
    }
    // return null
    return (
      directions && (
        
        <DirectionsRenderer directions={directions} />
      
      )
    );
  }
  
  export default MapDirectionsRenderer