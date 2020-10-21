import React from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';

const UpdateRouteToggleButton = (props) => {
    
    const isRouteMine = () => {

        let myRoutes = props.user.play_routes.map( p => p.id);

        return  myRoutes.includes(props.routeID) ? (true) : (false);
    }

    return(
        !isRouteMine() ? 
        (
            <Button as='div' labelPosition='right'>
            <Button color='red'>
              <Icon name='heart' />
              Favorite this Route
            </Button>
            <Label as='a' basic color='red' pointing='left'>
              2,048
            </Label>
          </Button>
        ) 
        : 
        (
            <Button as='div' labelPosition='right'>
      <Button basic color='blue'>
        <Icon name='fork' />
        Edit My Route
      </Button>
      <Label as='a' basic color='blue' pointing='left'>

      </Label>
    </Button>
        )
    )
        
    
}

export default UpdateRouteToggleButton