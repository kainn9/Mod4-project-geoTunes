import React, { useState } from 'react';


const Login = (props) => {
    
   
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    
    const updateState = (e) =>{
        switch(e.target.name) {
            case "username":
                setUsername(e.target.value)
                break;
            case 'password':
                setPassword(e.target.value)
                break;
            default:
                break
        };
    };

    const handleUserInfo = (e) =>{
        e.preventDefault();
        let userObj = {
            username: username,
            password: password
        };

        props.loginHandler(userObj);
        setUsername('');
        setPassword('');
    };

    
   
   
    return(
        <div>
            <form onSubmit={handleUserInfo}>
                <label>Username</label>
                <input type='text' value={username} onChange={updateState} name="username"/>
                <label>Password</label>
                <input type='password' value={password} onChange={updateState} name="password"/>
                <input type='submit'/>
 
            </form>
                
        </div>
    );
};

export default Login;