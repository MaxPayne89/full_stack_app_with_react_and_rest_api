import React, { Fragment, useState, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import axios from 'axios'

const UpdateCourse = () => {
  const { id } = useParams()
  const history = useHistory()
  const [{data, isError, isLoading}] = useFetchData(`http://localhost:5000/api/courses/${id}`)
  const titleRef = useRef('')
  const descriptionRef = useRef('')
  const timeRef = useRef('')
  const materialsRef = useRef('')
  const [isSubmitError, setIsSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])

  return (
    <Fragment>
    { isError && <p>Something went wrong. Try refreshing the page, please.</p>}
    { isLoading && <p>Loading...</p> }
    { data && <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
      {isSubmitError && 
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
          //decrypt password  
          const password = atob(user.password)
          //user ought to be authenticated
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
          axios.put(`http://localhost:5000/api/courses/${id}`, course, requestConfig)
          .then(res => {
            //if status code signals a succesful update, redirect
            if(res.status === 204){
              history.push(`/courses/${id}`)
            }
          })
          .catch(err => {
            //if something went wrong, display it to the user
            setIsSubmitError(true)
            setErrorMsg(err.response.data.errors)
          })
        }}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                {/*use deaultValue instead of value so the it is not a read-only field  */ }
                <input ref={titleRef} id="title" name="title" type="text" className="input-title course--title--input" defaultValue={data.title}></input>
              </div>
            </div>
            <div className="course--description">
              <div>
                <textarea ref={descriptionRef} id="description" name="description" defaultValue={data.description}></textarea>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input ref={timeRef} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" defaultValue={data.estimatedTime}></input>
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea ref={materialsRef} id="materialsNeeded" name="materialsNeeded" defaultValue={data.materialsNeeded}></textarea>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">Update Course</button>
            <button className="button button-secondary" onClick={() => history.push(`/courses/${id}`)}>Cancel</button>
          </div>
        </form>
      </div>
      
    </div>
    }
    </Fragment>
  )
}

export default UpdateCourse
