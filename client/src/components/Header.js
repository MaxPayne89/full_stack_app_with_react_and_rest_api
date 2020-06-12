import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const userData = JSON.parse(localStorage.getItem('user'))
  const history = useHistory()
  //check if the user is authenticated. If so, display his/her name. Otherwise, show options to sign up or in
  return (
    isAuthenticated ? (
    <div className="header">
      <h1 className="header--logo">Courses</h1>
      <nav>
        <span>Welcome, {userData.firstName} {userData.lastName}</span>
        <Link className="signout" to="#" onClick={() => {
          logout()
          history.push("/")
        }}>Sign Out</Link>
      </nav>
    </div>
    ) :
    <div className="header">
      <h1 className="header--logo">Courses</h1>
      <nav>
        <Link className="signup" to="/signup">Sign Up</Link>
        <Link className="signin" to="/signin">Sign In</Link>
      </nav>
    </div>
  )
  
}
 export default Header