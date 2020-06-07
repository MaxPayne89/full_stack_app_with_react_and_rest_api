import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext)
  const userData = JSON.parse(localStorage.getItem('user'))
  console.log(userData)
  return (
    isAuthenticated ? (
    <div className="header">
      <h1 className="header--logo">Courses</h1>
      <nav>
        <span>Welcome, {userData.firstName} {userData.lastName}</span>
        <Link className="signout" to="/signout">Sign Out</Link>
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