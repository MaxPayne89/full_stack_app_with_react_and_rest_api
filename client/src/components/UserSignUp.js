import React, { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const UserSignUp = () => {
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  const history = useHistory()
  const fNameRef = useRef('')
  const lNameRef = useRef('')
  const emailRef = useRef('')
  const passwordref = useRef('')
  const confirmPasswordRef = useRef('')

  const checkPasswords = () => {
    if(passwordref.current.value === confirmPasswordRef.current.value){
      return true
    }else {
      return false
    }
  }

  return (
    <div className="bounds">
      <div className="grid centered signin">
        <h1>Sign Up</h1>
        {isError && <div>
          <h2 className="validation--errors--label">Validation Errors</h2>
          <div className="validation-errors">
            <ul>
              {errorMsg.map(err => {
                return (
                  <li>{err}</li>
                )
              })}
            </ul>
          </div>
        </div>}
        <div>
          <form onSubmit={(e) => {
            e.preventDefault()
            const match = checkPasswords()
            if(match){
              const user = {
                firstName: fNameRef.current.value,
                lastName: lNameRef.current.value,
                emailAddress: emailRef.current.value,
                password: passwordref.current.value
              }
              axios.post('http://localhost:5000/api/users', user)
              .then(res => console.log(res))
              .catch(err => {
                setIsError(true)
                setErrorMsg(err.response.data.errors)
              })
            } else {
              alert("Your passwords do not match, please check again!")
            }
          }}>
            <div><input ref={fNameRef} id="firstName" name="firstName" type="text" placeholder="First Name"></input></div>
            <div><input ref={lNameRef} id="lastName" name="lastName" type="text" placeholder="Last Name"></input></div>
            <div><input ref={emailRef} id="emailAddress" name="emailAddress" type="text" placeholder="Email Address"></input></div>
            <div><input ref={passwordref} id="password" name="password" type="password" placeholder="Password"></input></div>
            <div><input ref={confirmPasswordRef} id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm Password"></input></div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Sign Up</button>
              <button className="button button--secondary" onClick={() => history.push("/")} >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserSignUp
