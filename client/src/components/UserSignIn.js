import React, { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const UserSignIn = () => {

  const { signIn } = useContext(AuthContext)
  const emailRef = useRef('')
  const passwordRef = useRef('')

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
          <div>
            <form onSubmit={ (e) => {
              e.preventDefault()
              signIn(emailRef.current.value, passwordRef.current.value)}
              } >
              <div>
                <input ref={emailRef} id="emailAddress" name="emailAddress" type="text" placeholder="Email Address"></input>
              </div>
              <div>
                <input ref={passwordRef} id="password" name="password" type="password" placeholder="Password"></input>
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign In</button>
                <button className="button button-secondary">Cancel</button>
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