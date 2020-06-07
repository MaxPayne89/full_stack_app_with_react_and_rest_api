import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Courses from './components/Courses';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import Auth from './context/Auth';

const App = () => {
  return ( 
    <Auth>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' >
            <Courses />
          </Route>
          <Route exact path='/courses/create' >
          </Route>
          <Route path='/courses/:id' >
          </Route>
          <Route path='/courses/:id/update' >
          </Route>
          <Route path="/signin">
            <UserSignIn />
          </Route>
          <Route path="/signup">
          </Route>
          <Route path="/signout">
          </Route>
        </Switch>
      </Router>
    </Auth>
  )
}

export default App;
