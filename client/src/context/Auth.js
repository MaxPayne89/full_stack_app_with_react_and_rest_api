import React, {useState, createContext, useEffect } from 'react'
import { useLocalStorage } from 'react-use'

export const AuthContext = createContext({})

export const Auth = ({ children }) => {
  //several useState hooks which keep track of the component's state 
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  //check local storage for existing user
  const [user] = useLocalStorage('user', '')
  useEffect(() => {
    user ? setIsAuthenticated(true) : setIsAuthenticated(false)
  },[user])

  const logout = () => {
    localStorage.clear()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
  
}

export default Auth
