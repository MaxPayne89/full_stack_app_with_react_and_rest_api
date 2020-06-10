import React, { Fragment, useState, useRef } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import axios from 'axios'

const UpdateCourse = () => {
  const { id } = useParams()
  const history = useHistory()
  const [{data, isError, isLoading}] = useFetchData(`http://localhost:5000/api/courses/${id}`, {})
  const [isSubmitError, setIsSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  console.log(data)

  return (
    <Fragment>
    { isError && <p>Something went wrong. Try refreshing the page, please.</p>}
    { isLoading && <p>Loading...</p> }
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input id="title" name="title" type="text" className="input-title course--title--input">{data.title}</input>
              </div>
            </div>
            <div className="course--description">
              <div>
                <textarea id="description" name="description">{}</textarea>
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input">{}</input>
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
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
    </Fragment>
  )
}

export default UpdateCourse
