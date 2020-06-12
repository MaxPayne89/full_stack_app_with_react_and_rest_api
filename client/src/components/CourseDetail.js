import React, { Fragment, useContext, useState } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import { AuthContext } from '../context/Auth'
import "../styles/global.css"
import ReactMarkdown from 'react-markdown'
import axios from 'axios'

const CourseDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const [{data, isError, isLoading}] = useFetchData(`http://localhost:5000/api/courses/${id}`)
  const { isAuthenticated } = useContext(AuthContext)
  const [ deleteError, setDeleteError] = useState(false)

  //check that the user's id and the userId property of the course match
  const checkIdUserToCourse = () => {
    const idOfUser = JSON.parse(localStorage.getItem('user')).id
    const userId =  data.userId
    if(userId === idOfUser ){
      return true
    }else {
      return false
    }
  }

  return (
    <Fragment>
    { deleteError && <p>Something went wrong, probably a network issue.</p> }
    {isError && <p>Something went wrong. Try refreshing the page, please</p>}
    {isLoading && <p>Loading...</p>}
    {data && <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
            { ( isAuthenticated && checkIdUserToCourse() ) && (
              <Fragment>
                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                <button className="button" to="/" onClick={async () => {
                  const user = JSON.parse(localStorage.getItem('user'))
                  const username = user.username
                  //decrypt the password
                  const password = atob(user.password)
                  const requestConfig = {
                    auth: {
                      username,
                      password
                    }
                  }
                  await axios.delete(`http://localhost:5000/api/courses/${id}`, requestConfig)
                  .then(res => {
                    //redirect if status indicates a succesful delete
                    if(res.status === 204){
                      history.push("/")
                    }
                  })
                  .catch(err => {
                    setDeleteError(true)
                  })
                }}>Delete Course</button>
              </Fragment>
              )
            }
              <Link className="button button-secondary" to="/">Return to List</Link>
            </span>
          </div>
        </div>
      </div>

      <div className="bounds course--detail">
        <div className="grid-66">
          <div className="course--header">
            <h4 className="course--label">Course</h4>
            <h3 className="course--title">{data.title}</h3>
          </div>
          <div className="course--description">
          {/*make sure that the property exists */}
            {data.description ? (data.description.split("\n").map( (sentence, index) => {
              return (
                <ReactMarkdown key={index}>{sentence}</ReactMarkdown>
              )
            }
            )) : null }
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{data.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  {/*make sure that the property exists */}
                  {data.materialsNeeded ? (data.materialsNeeded.split("\n").map((material, index) => {
                    if(material){
                      return(
                          <ReactMarkdown key={index}>{material}</ReactMarkdown>
                      )
                    } else {
                      return null
                    }
                  })) : null }
                </ul>

              </li>
            </ul>

          </div>

        </div>
      </div>
    </div>}
    </Fragment>
  )
}

export default CourseDetail
