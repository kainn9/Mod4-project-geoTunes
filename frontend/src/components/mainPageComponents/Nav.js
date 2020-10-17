import React, { useState, useEffect} from 'react'
import { Button, Menu } from 'semantic-ui-react'
import SpotifyAuthButton from './SpotifyAuthButton';
import {NavLink} from 'react-router-dom';



const Nav = (props) => {

  const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

  useEffect(() => {
    setToken(localStorage.getItem('spotifyAuthToken'))
  }, [token])



  return(
    <Menu>
      <Menu.Item>
      {
      token ? 
      (<NavLink to='/create'>
          <Button>Create Path</Button>
        </NavLink>
      )
      :
      (
        <SpotifyAuthButton header='Register Spotify'/>
      )
      }
      </Menu.Item>
      <Menu.Item>
        <Button>Button 2</Button>
      </Menu.Item>

      <Menu.Item>
        <Button
          onClick = { () => props.logOutHandler()}
        >Sign out</Button>
      </Menu.Item>
    </Menu>
  )
}

export default Nav
