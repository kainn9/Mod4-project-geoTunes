import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useHistory } from "react-router";
import SignUp from './components/LoginComponents/Signup';
import HomeContainer from './containers/HomeContainer';
import PreviewContainer from './containers/PreviewContainer';
import './App.css';
import CreateMap from './containers/maps/CreateMap';
import RoutesContainer from './containers/RoutesContainer'
import {getUser as getUserRoute, users as userRoute, login as loginRoute} from './railsserver'


const App = (props) => {

    const [playRouteId, setPlayRoute]= useState(null)

    const history = useHistory();
    const [user, setUser] = useState('init');

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
        fetch(getUserRoute, {
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


      fetch(loginRoute, options)
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


    fetch(userRoute, options)
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
          <Route path='/home' render={() => <HomeContainer setPlayRoute = {setPlayRoute} history = {history}  user={user} logOutHandler={logOutHandler}/>}/>
          <Route  path="/create" render={() => <CreateMap history={history} user={user} logOutHandler={logOutHandler}/>}/> 
          <Route  path="/routes/:id" render={(routerProps) => {
              let id = parseInt(routerProps.match.params.id)
              return <RoutesContainer routerID={id} logOutHandler={logOutHandler} />
          }}/> 
        </Switch> 
      )
    }; 
  };


  return render();
}

export default App;
 