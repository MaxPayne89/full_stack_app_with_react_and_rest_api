import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Auth'


function UserSignOut() {
  const { logout } = useContext(AuthContext)
  logout()
  return (
    <Redirect to={{ pathname: "/"}} />
  )
}

export default UserSignOut
