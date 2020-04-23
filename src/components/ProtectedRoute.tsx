/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ component: Comp, authenticated, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        return authenticated ? <Comp {...props} /> : <Redirect to="/auth" />;
      }}
    />
  );
};
