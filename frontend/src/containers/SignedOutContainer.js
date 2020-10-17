import React from 'react';
import { NavLink } from 'react-router-dom';
import Login from './Login'

const SignedOutContainer = (props) => {
    return (
        <>
            <Login loginHandler={props.loginHandler} />
        </>
    );
};

export default SignedOutContainer;