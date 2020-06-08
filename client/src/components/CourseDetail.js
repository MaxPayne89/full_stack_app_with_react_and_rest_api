import React, { Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'
import "../styles/global.css"

const CourseDetail = () => {
  const { id } = useParams()
  const [{data, isError, isLoading}, fetchData] = useFetchData(`http://localhost:5000/api/courses/${id}`)

  return (
    <Fragment>
    {isError && <p>Something went wrong. Try refreshing the page, please</p>}
    {isLoading && <p>Loading...</p>}
    {data && <div>
      <div className="actions--bar">
        <div className="bounds">
          <div className="grid-100">
            <span>
              <Link className="button" to="/">Update Course</Link>
              <Link className="button" to="/">Delete Course</Link>
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
                <h3>{data.estimatedTime}</h3>
              </li>
              <li className="course--stats--list--item">
                <h4>Materials Needed</h4>
                <ul>
                  {data.materialsNeeded.split("\n").map(material => {
                    if(material){
                      return(
                          <li>{material}</li>
                      )
                    } else {
                      return null
                    }
                  })}
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
