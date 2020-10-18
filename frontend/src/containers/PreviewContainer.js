import React from 'react';
import PreviewMap from './maps/PreviewMap';
import Login from './LoginContainer'

const PreviewContainer = (props) => {
    return (
        <>
            <Login loginHandler={props.loginHandler} />
            <PreviewMap />
        </>
    );
};

export default PreviewContainer;