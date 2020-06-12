/*I think that this component is not really necessary and it would be simpler to just call the logout function from the context
in the Headers sign out button.
*/
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
