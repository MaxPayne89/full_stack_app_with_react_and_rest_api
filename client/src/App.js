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
import UserSignUp from './components/UserSignUp'

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
          <PrivateRoute path='/courses/:id/update' >
          </PrivateRoute>
          <Route path="/signin">
            <UserSignIn />
          </Route>
          <Route path="/signup">
            <UserSignUp />
          </Route>
          {/* does that necessarily have to be a route? I solved it a little differently. See the header component for that. */}
          <Route path="/signout">
            <UserSignOut />
          </Route>
        </Switch>
      </Router>
    </Auth>
  )
}

export default App;
