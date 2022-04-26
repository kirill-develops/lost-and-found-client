/* eslint-disable sort-imports */
import './LoginButton.scss';
import { useLocation } from 'react-router-dom';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5050';

const LoginButton = () => {
  const { pathname } = useLocation();
  return (
    // The link will take user to `http://localhost:5050/auth/google` which
    // starts the authentication process with Google, just like we were testing
    // on the server side After successful authentication user will be
    // redirected back to client - side app with the cookie set
    <a className="login-button" href={`${SERVER_URL}/auth/google?${pathname}`}>
      <FcGoogle size={28} />
      <span className="login-button__text">Login with Google</span>
    </a>
  );
};

export default React.memo(LoginButton);
