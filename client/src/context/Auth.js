import React, {useState, createContext, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext({})

export const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  //check local storage for existing user
  useEffect(() => {
    const user = localStorage.getItem('user')
    user ? setIsAuthenticated(true) : setIsAuthenticated(false)
  })
  //asynchronous func which handles the sign procedure
  const signIn = async (username, password) => {
    setIsError(false)
    setIsLoading(true)
    const requestConfig = {
      auth: {
        username,
        password
      }
    }
    try {
      const result = await axios('http://localhost:5000/api/users', requestConfig)
      //set encrypted password
      result.data.password = btoa(password)
      localStorage.setItem('user', JSON.stringify(result.data))
      setIsAuthenticated(true)
    } catch(err) {
      setIsError(true)
    }
    setIsLoading(false)
    // const [{data, isError}, fetchData] = useFetchData('http://localhost:5000/api/users', requestConfig)
    // const response = await axios('http://localhost:5000/api/users', {
    //   auth: {
    //     username,
    //     password
    //   }
    // })
    // if(response.status === 200){
    //   localStorage.setItem('user', JSON.stringify(response.data))
    //   setIsAuthenticated(true)
    // } else if(response.status === 401) {
    //   setIsError(true)
    // }
  }
  const logout = () => {
    localStorage.removeItem('user')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout, isError, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default Auth
