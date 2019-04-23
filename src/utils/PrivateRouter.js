import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ redirect, component: Component, user, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        !redirect ? (
          <Component user={user} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
);