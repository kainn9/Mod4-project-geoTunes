import React, { useState, useEffect} from 'react'
import { Button, Menu } from 'semantic-ui-react'
import SpotifyAuthButton from './SpotifyAuthButton';
import { NavLink } from 'react-router-dom';



const Nav = (props) => {

  const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

  useEffect(() => {
    setToken(localStorage.getItem('spotifyAuthToken'))
  }, [token])



  return(
    <Menu>
      <Menu.Item>
        <NavLink to={'/home'}>
          <Button>Home</Button>
        </NavLink>
        
      </Menu.Item>

      <Menu.Item>
        {token ? 
        (
          <NavLink to='/create'>
            {!props.createMode ? 
                <Button>Create Path</Button> 
                :
                <Button
                  onClick={props.createPath}
                >
                  Submit Path</Button>
              }
          </NavLink>
        )
        :
        (
          <SpotifyAuthButton header='Register Spotify'/>
        )}
      </Menu.Item>

      <Menu.Item>
        <NavLink to={`/profile/${props.user.user.id}`}>
          <Button
            >My Profile
          </Button>
        </NavLink>
      </Menu.Item>

      <Menu.Item>
        <Button
          onClick = {props.logOutHandler}
          >Sign out</Button>
      </Menu.Item>
    </Menu>
  )
}

export default Nav
