import React, {useState, useEffect } from 'react';
import {playroutes} from "../railsserver"
import ShowMap from './maps/ShowMap';
import GeoPlayer from '../components/mainPageComponents/GeoPlayer'

const RoutesContainer = (props) =>{
    const prepPinRender = (prd) => {
        console.log('prd', prd)
        return prd.pins.map(pin => ({lat: pin.lat, lng: pin.lng}))
    }
   
    const [routeObj, setRouteObj] = useState([]);
    const [markers, setMarkers] = useState([]);
    

    useEffect(
        ()=>{
     fetch(playroutes+props.routerID, {
         method: 'GET',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
    .then(res=>res.json())
    .then(route =>{
        let cords = prepPinRender(route);
        setRouteObj(route);
        setMarkers(cords);
       
        
    })  
        },[] )
    
 

    return (
        <>
    {/* <Route path="/routes/:id" render={(routerProps) => {
  
  let id = parseInt(routerProps.match.params.id)

      let route = this.state.api.find(el => el.id === id)
      console.log(foundDog)
      return (<RouteShow route={route} />)
  
 */}    
        <ShowMap showMarkers={markers}/>
  {console.log("this is it!", routeObj.playlist)}
        <h2> in Routes Container this is the id: {props.routerID} {console.log('inShowMAp', markers)} </h2>
    { routeObj.playlist !== undefined ? <GeoPlayer playlist = {routeObj.playlist}/> : null}

{/* }} /> */}
        </>
    )
}


export default RoutesContainer
