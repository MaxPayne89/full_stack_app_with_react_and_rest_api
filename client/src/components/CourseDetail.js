import React, { Fragment, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import { AuthContext } from '../context/Auth'
import "../styles/global.css"
import ReactMarkdown from 'react-markdown'

const CourseDetail = () => {
  const { id } = useParams()
  const [{data, isError, isLoading}] = useFetchData(`http://localhost:5000/api/courses/${id}`)
  const { isAuthenticated } = useContext(AuthContext)

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
                <Link className="button" to="/">Delete Course</Link>
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
            {data.description.split("\n").map( sentence => {
              return (
                <p>{sentence}</p>
              )
            }
            )}
          </div>
        </div>
        <div className="grid-25 grid-right">
          <div className="course--stats">
            <ul className="course--stats--list">
              <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3><ReactMarkdown>{data.estimatedTime}</ReactMarkdown></h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  {data.materialsNeeded ? (data.materialsNeeded.split("\n").map(material => {
                    if(material){
                      return(
                          <ReactMarkdown>{material}</ReactMarkdown>
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
