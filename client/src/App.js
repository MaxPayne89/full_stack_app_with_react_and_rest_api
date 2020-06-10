import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Courses from './components/Courses';
import Header from './components/Header';
import UserSignIn from './components/UserSignIn';
import Auth from './context/Auth';
import PrivateRoute from './components/PrivateRoute'
import CreateCourse from './components/CreateCourse';
import UserSignOut from './components/UserSignOut'
import CourseDetail from './components/CourseDetail'
import UserSignUp from './components/UserSignUp'
import UpdateCourse from './components/UpdateCourse'
import NoMatch from './components/NoMatch';

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
          <Route exact path='/courses/:id' >
            <CourseDetail />
          </Route>
          <PrivateRoute exact path='/courses/:id/update' >
            <UpdateCourse />
          </PrivateRoute>
          <Route exact path="/signin">
            <UserSignIn />
          </Route>
          <Route exact path="/signup">
            <UserSignUp />
          </Route>
          {/* does that necessarily have to be a route? I solved it a little differently. See the header component for that. */}
          <Route path="/signout">
            <UserSignOut />
          </Route>
          <Route>
            <NoMatch path="*" />
          </Route>
        </Switch>
      </Router>
    </Auth>
  )
}

export default App;
