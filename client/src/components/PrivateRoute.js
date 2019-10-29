import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
//above we take out component and then spread the rest of the keys 
    return (
      <Route
        {...rest} //spreading all the keys except component
        render={() => {
          if (localStorage.getItem('token')) {
            // if token is in localstorage, render the given component
            return <Component />;
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    );
  };
  
  export default PrivateRoute;