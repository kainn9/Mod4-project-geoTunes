import React from 'react';

const SignedInContainer = (props) =>{

    return(
        <div>
            <h1> This is the Signed in container </h1>

            <button onClick = {() => props.logOutHandler()} >
                signOut
            </button>
        </div>
    );
};

export default SignedInContainer;