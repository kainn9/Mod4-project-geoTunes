import React, { useState, useEffect } from 'react';
import useToggle from 'react-use-toggle';
import {
  Dropdown, Header, Icon, Input,
} from 'semantic-ui-react';
import { playroutes } from '../railsserver';
import ShowMap from './maps/ShowMap';
import GeoPlayer from '../components/mainPageComponents/GeoPlayer';
import Nav from '../components/mainPageComponents/Nav';
import UpdateRouteToggleButton from '../components/mainPageComponents/UpdateRouteToggleButton';
import SpotifyAuthButton from '../components/mainPageComponents/SpotifyAuthButton';
import '../customCss/showPage.css';

const RoutesContainer = (props) => {
  const prepPinRender = (prd) => prd.pins.map((pin) => ({ lat: pin.lat, lng: pin.lng }));

  const [routeObj, setRouteObj] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [newArray, setNewArray] = useState([]);
  const [distance, setDistance] = useState('');

  const getData = (obj) => {
    console.log('getData:', obj);
    setDistance(obj.routes[0].legs[0].distance.text);
  };

  const patchRequest = () => {
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        headers: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ cords: newArray }),
    };

    fetch(playroutes + props.routerID, options).then().then();
  };

  const [routeName, setRouteName] = useState('');
  useEffect(
    () => {
      localStorage.setItem('currentRoute', props.routerID);
      fetch(playroutes + props.routerID, {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((res) => res.json())
        .then((route) => {
          console.log(route);
          const cords = prepPinRender(route);
          setRouteObj(route);
          setMarkers(cords);
          setRouteName(route.name);
        });
    }, [],
  );

  const [isDragable, toggle] = useToggle(false);

  return (
    <div id="showPageBody">
      <Header id="logoHeader" as="h2" icon>
        <Icon name="map pin" />
        Current Play Route:
        <Header.Subheader id="logoSubHeader">
          {routeName}
        </Header.Subheader>
      </Header>
      <Nav user={props.user} logOutHandler={props.logOutHandler} />
      <ShowMap draggableVal={isDragable} getData={getData} routesContainer showMarkers={markers} getCords={setNewArray} />
      <UpdateRouteToggleButton toggle={toggle} patch={patchRequest} routeID={props.routerID} user={props.user.user} cords={newArray} />
      <div id="box" style={{ 'max-height': '30vh', overflow: 'scroll' }}>
        <div id="panel" />
        <div id="other_info">

          <div id="other_info_bit">
            <h2>Total Distance:</h2>
            <p>{distance}</p>
          </div>
          <div id="other_info_bit">
            <h2>Time to Walk:</h2>
            <p>{distance}</p>
          </div>
        </div>
      </div>

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
      { routeObj.playlist && localStorage.getItem('spotifyAuthToken') ? <GeoPlayer playlist={routeObj.playlist} /> : <SpotifyAuthButton header="Connect to Spotify to View Playlist" redirectUri="http://localhost:3001/routes" />}

      {/* }} /> */}
    </div>
  );
};

export default RoutesContainer;
