import React, { useContext, useRef } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const UserSignIn = () => {
  //history object from react-router
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };
  const { isAuthenticated, signIn, isError, errorMsg } = useContext(AuthContext)
  const emailRef = useRef('')
  const passwordRef = useRef('')

  //if the user is already authenticated, he should be redirected to where he came from
  return (
    isAuthenticated ? <Redirect to={from.pathname} /> :
    <div className="bounds">
    {isError && 
            <div>
              <h2 className="validation--errors--label">Authorization Error</h2>
              <div className="validation-errors">
                <ul>
                    {/*There's only one message, so no need for a loop  */}
                    <li>{errorMsg}</li>
                </ul>
              </div>
            </div>
          }
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
          <div>
            <form onSubmit={ (e) => {
                e.preventDefault()
                signIn(emailRef.current.value, passwordRef.current.value)
              }
            } >
              <div>
                <input ref={emailRef} id="emailAddress" name="emailAddress" type="email" placeholder="Email Address"></input>
              </div>
              <div>
                <input ref={passwordRef} id="password" name="password" type="password" placeholder="Password"></input>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary" onClick={() => history.push("/")} >Cancel</button>
              </div>
            </form>
          </div>
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>

      </div>

    </div>
  )
}

export default UserSignIn