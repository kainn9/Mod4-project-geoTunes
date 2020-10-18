import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router";
import SignUp from './components/LoginComponents/Signup';
import HomeContainer from './containers/HomeContainer';
import PreviewContainer from './containers/PreviewContainer';
import './App.css';
import CreateMap from './containers/maps/CreateMap';


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
      console.log('logoutHandler')
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
          <Route  exact path="/" render={() => <PreviewContainer loginHandler={loginHandler}/>}/> 
        </Switch>
      )

    } else {
      return (
        <Switch>
          <Route path='/home' render={() => <HomeContainer  user={user} logOutHandler={logOutHandler}/>}/>
          <Route  path="/create" render={() => <CreateMap user={user} logOutHandler={logOutHandler}/>}/> 
        </Switch> 
      )
    }; 
  };


  return render();
}

export default App;
