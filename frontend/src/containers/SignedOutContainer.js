import React from 'react';
import { NavLink } from 'react-router-dom';
import FullMap from './FullMap';
import Login from './Login'

const SignedOutContainer = (props) => {
    return (
        <>
            <Login loginHandler={props.loginHandler} />
            <FullMap />
        </>
    );
};

export default SignedOutContainer;