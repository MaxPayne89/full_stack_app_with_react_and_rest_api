import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from '../context/Auth'

const PrivateRoute = ({children, ...rest}) => {
  const { isAuthenticated } = useContext(AuthContext)

  // return (
  //   <Route
  //     {...rest}
  //     render={() =>
  //       isLoading ? (
  //         <p>Loading...</p>
  //       ) :
  //       isAuthenticated ? (
  //         children
  //       ) : (
  //         <Redirect to={{ pathname: "/signin" }} />
  //       )
  //     }
  //   />
  // );
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute