import React, {useState, createContext, useEffect } from 'react'
import { useLocalStorage } from 'react-use'
import axios from 'axios'

export const AuthContext = createContext({})

export const Auth = ({ children }) => {
  //several useState hooks which keep track of the component's state 
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  //check local storage for existing user
  const [user, setUser] = useLocalStorage('user', '')
  useEffect(() => {
    user ? setIsAuthenticated(true) : setIsAuthenticated(false)
  },[user])

  const signIn = (username, password) => {
    const requestConfig = {
      auth: {
        username,
        password
      }
    }
    axios('http://localhost:5000/api/users', requestConfig)
    .then(res => {
      if(res.status === 200){
        res.data.password = btoa(password)
        setUser(res.data)
        setIsAuthenticated(true)
      }
     })
    .catch(() => {
      setErrorMsg('Access Denied')
      setIsError(true)
      })
  }

  const logout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, setIsAuthenticated, signIn, errorMsg, isError }}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default Auth
