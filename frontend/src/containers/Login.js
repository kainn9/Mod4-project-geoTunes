import React from 'react';

import '../customCss/loginCss.css'
import LoginForm from '../components/LoginComponents/LoginForm'


const Login = (props) => {
    
   
    

    
   
   
    return(
        <div>
            {/* <form onSubmit={handleUserInfo}>
                <label>Username</label>
                <input type='text' value={username} onChange={updateState} name="username"/>
                <label>Password</label>
                <input type='password' value={password} onChange={updateState} name="password"/>
                <input type='submit'/>
 
            </form> */}
            <LoginForm loginHandler = {props.loginHandler} />
    

            
                
        </div>
    );
};

export default Login;