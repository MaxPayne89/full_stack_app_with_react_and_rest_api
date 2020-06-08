import React from 'react';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Courses from './components/Courses';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import Auth from './context/Auth';
import PrivateRoute from './components/PrivateRoute'
import CreateCourse from './components/CreateCourse';
import UserSignOut from './components/UserSignOut'
import CourseDetail from './components/CourseDetail'

const App = () => {
  return ( 
    <Auth>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' >
            <Courses />
          </Route>
          <PrivateRoute exact path='/courses/create' >
            <CreateCourse />
          </PrivateRoute>
          <Route path='/courses/:id' >
            <CourseDetail />
          </Route>
          <Route path='/courses/:id/update' >
          </Route>
          <Route path="/signin">
            <UserSignIn />
          </Route>
          <Route path="/signup">
          </Route>
          <Route path="/signout">
            <UserSignOut />
          </Route>
        </Switch>
      </Router>
    </Auth>
  )
}

export default App;
