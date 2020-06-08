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
            <div className="grid-33">
              <Link className="course--module course--link" to={`/courses/${course.id}`} >
                <h4 className="course--label">Course</h4>
                <h3 id={course.id} className="course--title">{course.title}</h3>
              </Link>
            </div>
          )
        })}
      </div>
    </Fragment>
  )

}

export default Courses