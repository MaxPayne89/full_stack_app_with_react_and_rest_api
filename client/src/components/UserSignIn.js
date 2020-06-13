import React, { useContext, useRef, useState } from 'react'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/Auth'
import axios from 'axios'
import { useLocalStorage } from 'react-use'

const UserSignIn = () => {
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };
  const [, setUser] = useLocalStorage('user', '')
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
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
              const requestConfig = {
                auth: {
                  username: emailRef.current.value,
                  password: passwordRef.current.value
                }
              }
              axios('http://localhost:5000/api/users', requestConfig)
              .then(res => {
                if(res.status === 200){
                  res.data.password = btoa(requestConfig.auth.password)
                  setUser(res.data)
                  setIsAuthenticated(true)
                }
               })
              .catch(err => {
                console.error(err)
                setErrorMsg('Access Denied')
                setIsError(true)
                //empty the password field
                passwordRef.current.value = ''
                  })
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