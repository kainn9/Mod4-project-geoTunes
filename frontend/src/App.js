import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router";

import SignedOutContainer from './containers/SignedOutContainer';
import SignedInContainer from './containers/SignedInContainer';
import Login from './containers/Login';
import SignUp from './components/Signup';
import CreatePathContainer from './containers/CreatePathContainer'

import './App.css';


const App = () => {
    const history = useHistory();
    const [user, setUser] = useState('init');

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
        fetch('http://localhost:3000/api/v1/profile', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(res => res.json())
        .then(matchedUser => {
          setUser(matchedUser)
        });

      } else {
        setUser(null)
      };
    }, []);

    const logOutHandler = () => {
      localStorage.clear();
      history.push('/');
      setUser(null);
    };

    const loginHandler = (userInfo) => {

      const options ={
        method:'POST',
        headers: {
          'content-type':'application/json',
          'accept':'application/json'
        },
        body: JSON.stringify({user: userInfo})
      };


      fetch('http://localhost:3000/api/v1/login', options)
      .then( r => r.json())
      .then(foundUser => {
        setUser(foundUser);
        localStorage.setItem("token", foundUser.jwt);
        history.push('/home')
      });
    };

    const signUpHandler = (userObj) =>{
      
      const options ={
        method:'POST',
        headers: {
            'content-type':'application/json',
            'accept':'application/json'
          },
          body: JSON.stringify({user: userObj})
        };


    fetch('http://localhost:3000/api/v1/users', options)
    .then( resp => resp.json() )
    .then(newUser => {

      if (newUser.error) {
        alert('username taken')

      } else {
        localStorage.setItem("token", newUser.jwt);
        setUser(newUser)
        history.push('/home')
      }
      
    });
   
  };

  const render = () => {

    if(user === 'init') {
      return <h2>this is a loading bar lol</h2>

    } else if(!user) {
      return (
        <Switch>
          <Route path='/signup' render={() => <SignUp signUpHandler={signUpHandler}/>}/>
          <Route  exact path="/" render={() => <SignedOutContainer loginHandler={loginHandler}/>}/> 
        </Switch>
      )

    } else {
      return (
        <Switch>
          <Route path='/home' render={() => <SignedInContainer  user={user} logOutHandler={logOutHandler}/>}/>
          <Route  path="/create" render={() => <CreatePathContainer user={user} logOutHandler={logOutHandler}/>}/> 
        </Switch>
    
      /* <Route path="/home" render={() => <SignedInContainer 
        user={user}
        logOutHandler={logOutHandler} />}
    /> 
    <Route path="/create" render={()->{Crae}} */
   
      )
    }; 
  };


  return render();
}

export default App;
