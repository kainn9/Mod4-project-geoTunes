import React, { useState, useEffect } from 'react'
import { Button, Menu } from 'semantic-ui-react'
import SpotifyAuthButton from './SpotifyAuthButton'


const Nav = () => {

  const [token, setToken] = useState(localStorage.getItem('spotifyAuthToken'));

  useEffect(() => {
    setToken(localStorage.getItem('spotifyAuthToken'))
  }, [token])



  return(
    <Menu>
      <Menu.Item>
      {
      token ? 
      (
        <Button>Button 1</Button>
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
        <Button>Button 3</Button>
      </Menu.Item>
    </Menu>
  )
}

export default Nav
