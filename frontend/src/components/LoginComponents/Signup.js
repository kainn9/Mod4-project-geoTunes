import React, { useState } from 'react';


const SignUp = (props) => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [name, setName] = useState('');
    
    
    const updateState = (e) =>{

        switch(e.target.name) {
            case "username":
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'confirmation':
                setConfirmation(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            default:
                break
        } 
    }
  

    const gatherState = (e) =>{
        e.preventDefault();

        if( password === confirmation) { 
            
            props.signUpHandler({
                username: username,
                password: password, 
                name: name
            });

            setUsername('');
            setPassword('');
            setConfirmation('');
            setName('');

        } else {
            alert('passwords dont match');
        }

    }
       
    return (
        <>
            <form onSubmit={gatherState}>
                <label>UserName</label>
                <input type='text' value={username} onChange={updateState} name='username'/>
                <label>Password</label>
                <input type='password' value={password} onChange={updateState} name="password"/>
                <label>Confirm Password</label>
                <input type='password' value={confirmation} onChange={updateState} name="confirmation"/>
                <label> Name </label>
                <input  value={name} onChange={updateState} name="name"/>
                <br></br>
                <input type='submit'/>
            </form>
        </>
    );

};

export default SignUp;