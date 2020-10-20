import React, { useState, useEffect } from 'react';
import Nav from '../components/mainPageComponents/Nav'
import { getUser } from '../railsserver';
import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Search,
    Segment,
  } from 'semantic-ui-react'


const ProfileContainer = (props) => {
    
    const [updatedProfile, setUpdatedProfile] = useState(null);

    useEffect(() => {
        fetch(getUser, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        .then( r => r.json())
        .then(foundProfile => { 
            console.log(foundProfile)
            setUpdatedProfile(foundProfile) 
        })     
    }, [])
    return(
        <>
            
            <Nav user={props.user} />
            {
             
                updatedProfile ? 
                (
                <> 
                    <h1>{updatedProfile.user.name}</h1>
                    <h2>My routes: </h2>
                    <ul>
                    {

                        updatedProfile.user.play_routes.map( (r, i) => {
                            return <li key={r.id} >{ r.name }</li>
                        })
                    }
                    </ul>

                    <h2>Fav Routes:</h2>
                    
                    
                </>
                )
                :
                (
                    <h1>Loading</h1>
                )
                
            }
        </>
    )
}

export default ProfileContainer;