import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedOutContainer = (props) => {
    return (
        <div>
            <h1>This is the Signed Out Container</h1>
            <NavLink to='/login'>
                Click me to login!
            </NavLink >

            <NavLink to='/signup'>
                Click me to signup
            </NavLink>
        </div>
    );
};

export default SignedOutContainer;