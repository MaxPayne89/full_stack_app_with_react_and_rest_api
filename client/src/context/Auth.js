import React, {useState, createContext, useEffect } from 'react'
import axios from 'axios'
import { useLocalStorage } from 'react-use'

export const AuthContext = createContext({})

export const Auth = ({ children }) => {
  //several useState hooks which keep track of the component's state 
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState([])
  //check local storage for existing user
  const [user, setUser] = useLocalStorage('user', '')
  // const user = localStorage.getItem('user')
  useEffect(() => {
    user ? setIsAuthenticated(true) : setIsAuthenticated(false)
  },[user])
  //asynchronous func which handles the sign procedure
  // const signIn = async (username, password) => {
  //   if(isAuthenticated){
  //     return null
  //   }
  //   setIsError(false)
  //   setIsLoading(true)
  //   //request config for basic auth
  //   const requestConfig = {
  //     auth: {
  //       username,
  //       password
  //     }
  //   }
  //   axios('http://localhost:5000/api/users', requestConfig) 
  //   .then(res => {
  //     if(res.status === 200){
  //       //set encrypted password
  //       res.data.password = btoa(password)
  //       //set the user in browser's local storage
  //       // localStorage.setItem('user', JSON.stringify(res.data))
  //       setUser(JSON.stringify(res.data))
  //       setIsAuthenticated(true) 
  //     } 
  //   })
  //   .catch(err => setErrorMsg(err.message))
  //   // try {
  //   //   //get the data from the endpoint 
  //   //   const result = await axios('http://localhost:5000/api/users', requestConfig)
  //   //   if(result.status === 200){
  //   //     //set encrypted password
  //   //     result.data.password = btoa(password)
  //   //     //set the user in browser's local storage
  //   //     localStorage.setItem('user', JSON.stringify(result.data))
  //   //     setIsAuthenticated(true)
  //   //   } else {
  //   //     throw Error("Access Denied")
  //   //   }
  //   // } catch(err) {
  //   //   setIsError(true)
  //   //   setErrorMsg(err.message)
  //   // }
  //   setIsLoading(false)
  // }
  const logout = () => {
    // localStorage.removeItem('user')
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, isError, isLoading, errorMsg, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default Auth
