import React, { useState, useEffect } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import railsserver, { getUser } from '../../railsserver';

const UpdateRouteToggleButton = (props) => {

    const [cords, setCords] = useState(props.cords);
    const [updatedUser, setUpdatedUser] = useState(props.user)
    useEffect(() => {
        setCords(props.cords);
    }, [props.cords]);

    useEffect(() => {
        fetch(getUser, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(user => setUpdatedUser(user.user))
    }, [])

    const [editSaveToggle, toggleEditSave] = useState(true);
    
    const isRouteMine = () => {
        console.log('newUser', updatedUser)
        let myRoutes = updatedUser.play_routes.map( p => p.id);

        return  myRoutes.includes(props.routeID) ? (true) : (false);
    }

    return(
        updatedUser && isRouteMine() ? 
        (  
        <> 
            {editSaveToggle ? (
                <Button 
                    as='div' 
                    labelPosition='right'
                    onClick={() => {
                        toggleEditSave(current => !current)
                        props.toggle()
                    }}
                >
                    <Button color= 'blue'>
                        <Icon name='edit' />
                        Edit My Route
                    </Button>
                    <Label 
                        as='a' 
                        color='blue' 
                        pointing='left'>
      
                    </Label>
                </Button>
            ) 
            : (
                <Button 
                    as='div' 
                    labelPosition='right'
                    onClick={() => {
                        toggleEditSave(current => !current);
                        props.toggle();
                        props.patch()
                    }}
                >
                    <Button color='green'>
                        <Icon name='edit' />
                        Save my Route
                    </Button>
                        <Label 
                        as='a' 
                        basic color='green' 
                        pointing='left'>
                        <Icon name='headphones' />
                        </Label>
                    </Button>
            )}
            {true ? (
                <Button as='div' labelPosition='right'>
                <Button color='red'>
                    <Icon name='heart' />
                    Favorite This Route
                </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        500
                    </Label>
                </Button>
            ) : (
                <Button as='div' labelPosition='right'>
                <Button color='red'>
                    <Icon name='heart' />
                    Unfavorite This Route
                </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        500
                    </Label>
                </Button>
            )}
            
        </>  
        ) 
        : 
        (
            null
        )
    )
        
    
}

export default UpdateRouteToggleButton

//   <Button as='div' labelPosition='right'>
//             <Button color='red'>
//               <Icon name='save' />
//               Favorite this Route
//             </Button>
//             <Label as='a' basic color='red' pointing='left'>
//               2,048
//             </Label>
//           </Button>