import React, {useState, useEffect } from 'react';
import {playroutes} from "../railsserver";
import ShowMap from './maps/ShowMap';
import GeoPlayer from '../components/mainPageComponents/GeoPlayer';
import useToggle from 'react-use-toggle';
import Nav from '../components/mainPageComponents/Nav';
import UpdateRouteToggleButton from '../components/mainPageComponents/UpdateRouteToggleButton';


const RoutesContainer = (props) =>{
    const prepPinRender = (prd) => {
        return prd.pins.map(pin => ({lat: pin.lat, lng: pin.lng}))
    }
   
    const [routeObj, setRouteObj] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [newArray, setNewArray]= useState([]);

    const getCords = (array) => {
        console.log('top', newArray)
        setNewArray(array)
        console.log('below', newArray)
    }

    const patchRequest = () => {
        
        let options={
            method:'PATCH',
            headers:{
                'content-type':'application/json',
                'headers':'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            body: JSON.stringify({cords: newArray, test: 2})
        }

        fetch(playroutes + props.routerID, options).then().then()
        
    }

    

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
        },[])
    
    const [draggableVal, toggle] = useToggle(false);

    return (
        <>
        <Nav user={props.user} logOutHandler={props.logOutHandler} />
        <ShowMap draggableVal={draggableVal} routesContainer={true} showMarkers={markers} getCords={getCords}/>
        <UpdateRouteToggleButton routeID={props.routerID} user={props.user.user} />
        
        
        {/* {
            props.user ?
        (<button onClick={toggle}> {draggableVal===true? "Reset": "Update Route"} </button>
        {draggableVal===true? 
        <button
            onClick = { patchRequest }
        > Save Changes </button> : null }
        )
        :
        (
            null
        )
        }
         */}
    { routeObj.playlist !== undefined ? <GeoPlayer playlist = {routeObj.playlist}/> : null}

{/* }} /> */}
        </>
    )
}


export default RoutesContainer
