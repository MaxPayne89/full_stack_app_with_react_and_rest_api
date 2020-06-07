import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const AuthContext = createContext({})

export const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setIsError] = useState(false)
  //asynchronous func which handles the sign procedure
  const signIn = async (username, password) => {
    const response = await axios('http://localhost:5000/api/users', {
      auth: {
        username,
        password
      }
    })
    if(response.status === 200){
      localStorage.setItem('user', JSON.stringify(response.data))
      setIsAuthenticated(true)
    } else if(response.status === 401) {
      setIsError(true)
    }
  }
  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isError, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default Auth
