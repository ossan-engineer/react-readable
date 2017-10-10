import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';

export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  deauthenticate() {
    this.isAuthenticated = false;
  },
};

class Login extends Component {
  constructor() {
    super();

    this.state = {
      redirectToReferrer: false,
    };
  }

  login = (e) => {
    e.preventDefault();

    fakeAuth.authenticate(() => {
      this.setState({
        redirectToReferrer: true,
      });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      );
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object.isRequired, // TODO: Use shape
};

export default Login;
