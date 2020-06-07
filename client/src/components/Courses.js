import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import "../styles/global.css"
import { Link } from 'react-router-dom'

const Courses = () => {
  const [data, setData ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios('http://localhost:5000/api/courses')
      setData(response.data)
    }
    fetchData()
  },[])

  return (
    <div className="bounds">
      {data.map(course => {
        return (
          <div className="grid-33">
            <Link className="course--module course--link" to="/whatever">
              <h4 className="course--label">Course</h4>
              <h3 id={course.id} className="course--title">{course.title}</h3>
            </Link>
          </div>
        )
      })}
    </div>
  )

}

export default Courses