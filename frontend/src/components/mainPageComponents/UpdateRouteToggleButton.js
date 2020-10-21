import React, { useState, useEffect } from 'react';
import { Button, Icon, Label } from 'semantic-ui-react';
import { getUser, favCreate, playroutes } from '../../railsserver';

const UpdateRouteToggleButton = (props) => {

    const [cords, setCords] = useState(props.cords);
    const [updatedUser, setUpdatedUser] = useState(props.user);
    const [updatedRoute, setUpdatedRoute] = useState(null);
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

        fetch(playroutes + props.routeID, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(route => setUpdatedRoute(route))
    }, [])

    const isFavorited = () => {
        let routeIDS = updatedUser.fav_routes.map(r => r.play_route_id)
        console.log(updatedUser.fav_routes)
        return !routeIDS.includes(props.routeID)
    }

    const [editSaveToggle, toggleEditSave] = useState(true);
    const [favToggle, setFavToggle] = useState(isFavorited());
    
    const isRouteMine = () => {
        console.log('newUser', updatedUser)
        let myRoutes = updatedUser.play_routes.map( p => p.id);

        return  myRoutes.includes(props.routeID) ? (true) : (false);
    }

    const favRoute = () => {
        if (isFavorited()) {
            fetch(favCreate, {
                method: 'POST',
                headers: { 
                    Accepts: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({play_route_id: props.routeID, user_id: updatedUser.id})
            })
            .then()
            .then()
            
        }
        setFavToggle(false)
        setUpdatedRoute(current => ({users: [...current.users, 'who cares']}))
        
    }

    const unFavRoute = () => {
        if (!isFavorited()) {
            let favOBJ = updatedUser.fav_routes.find(r => r.play_route_id === props.routeID)
            console.log('favid', favOBJ.id)
            fetch(`${favCreate}/${favOBJ.id}`, {
                method: 'DELETE',
                headers: { 
                    Accepts: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then()
            .then()
            
        } 
        setFavToggle(true)
        setUpdatedRoute(current => {
            let oneLess = current.users.slice(0, - 1)
            console.log(oneLess)
            
            return {users: oneLess}
        })
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
            {favToggle ? (
                <Button onClick={favRoute} as='div' labelPosition='right'>
                <Button color='red'>
                    <Icon name='heart' />
                    Favorite This Route
                </Button>
                    <Label as='a' basic color='red' pointing='left'>
                        {updatedRoute && updatedRoute.users ? updatedRoute.users.length : null}
                    </Label>
                </Button>
            ) : (
                <Button onClick={unFavRoute} as='div' labelPosition='right'>
                <Button color='red'>
                    <Icon name='heart' />
                    Unfavorite This Route
                </Button>
                    <Label as='a' basic color='red' pointing='left'>
                    {updatedRoute && updatedRoute.users ? updatedRoute.users.length : null}
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