import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Courses from './components/Courses';

const App = () => {
  return ( 
    <Router>
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
        </Route>
        <Route path="/signup">
        </Route>
        <Route path="/signout">
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
