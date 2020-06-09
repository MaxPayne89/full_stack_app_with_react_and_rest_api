import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function CreateCourse() {
  const history = useHistory()
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  const titleRef = useRef('')
  const descriptionRef = useRef('')
  const timeRef = useRef('')
  const materialsRef = useRef('')

  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
      {isError && 
        <div>
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
        </div>
      }
        <form onSubmit={(e) => {
          e.preventDefault()
          const user = JSON.parse(localStorage.getItem('user'))
          const username = user.username
          const password = atob(user.password)
          const requestConfig = {
            auth: {
              username,
              password
            }
          }
          const course = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            estimatedTime: timeRef.current.value,
            materialsNeeded: materialsRef.current.value
          }
          axios.post('http://localhost:5000/api/courses', course, requestConfig)
          .then(res => console.log(res))
          .catch(err => {
            setIsError(true)
            setErrorMsg(err.response.data.errors)
          })
          
        }}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input ref={titleRef} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course Title..."></input>
              </div>
              <div className="course--description">
                <div>
                  <textarea ref={descriptionRef} id="description" name="description" placeholder="Course description..."></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input ref={timeRef} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours"></input>
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea ref={materialsRef} id="materialsNeeded" name="materialsNeeded" placeholder="List materials..."></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={() => history.push("/")}>Cancel</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default CreateCourse
