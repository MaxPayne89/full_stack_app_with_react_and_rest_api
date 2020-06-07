import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const AuthContext = createContext({})

export const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setIsError] = useState(false)
  const signIn = async (username, password) => {
    const response = await axios('http://localhost:5000/api/users', {
      auth: {
        username,
        password
      }
    })
    if(response.status === 200){
      setIsAuthenticated(true)
    } else if(response.status === 401) {
      setIsError(true)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isError, signIn }}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default Auth
