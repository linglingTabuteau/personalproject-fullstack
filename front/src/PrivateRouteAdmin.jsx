import React from 'react';
import {
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRouteAdmin = ({
  component: Component, user, token, ...rest
}) => (
  <Route
    {...rest}
// attention: after arrow function, we use {several ligns of instructions} so we need return inside{} else without {} we can avoid return just () is enoght
    render={(props) => {
      console.log('1privateRoute-props:', props);
      console.log('2privateRoute-...rest:', { ...rest });
      const cookies = new Map(document.cookie.split('; ').map(e => e.split('=')));

      if ((cookies.get('token') !== '' || token !== '') && user.email === 'lingling.tabuteau@gmail.com') {
        return (
          <Component {...props} />
        );
      }
      return (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location },
          }}
        />
      );
    }}
  />
);

const mstp = (state) => {
  console.log('privateRoute-state:', state);
  return ({
    token: state.auth.token,
    user: state.auth.user,
  });
};

export default connect(mstp)(PrivateRouteAdmin);
