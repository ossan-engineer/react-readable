import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fakeAuth } from '../routes/Login/components/Login';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return fakeAuth.isAuthenticated
        ? (
          <Component {...props} />
        )
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
    }}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func, // TODO: Use shape
  location: PropTypes.string,
};

export default PrivateRoute;
