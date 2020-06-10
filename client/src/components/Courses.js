import React, { Fragment } from 'react'
import "../styles/global.css"
import { Link } from 'react-router-dom'
import useFetchData from '../hooks/useFetchData'

const Courses = () => {
  const [{data, isLoading, isError}, fetchData] = useFetchData('http://localhost:5000/api/courses', [])

  return (
    <Fragment>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      <div className="bounds">
        {data.map(course => {
          return (
            <div key={course.id} className="grid-33">
              <Link className="course--module course--link" to={`/courses/${course.id}`} >
                <h4 className="course--label">Course</h4>
                <h3 id={course.id} className="course--title">{course.title}</h3>
              </Link>
            </div>
          )
        })}
        <div className="grid-33">
          <Link to="/courses/create" className="course--module course--add--module">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    </Fragment>
  )

}

export default Courses