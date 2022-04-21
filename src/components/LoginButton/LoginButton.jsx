import React from 'react';
import GoogleLogo from '../../assets/icons/google-logo-32px.svg';
import './LoginButton.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5050';

const LoginButton = () => (
  // The link will take user to `http://localhost:5050/auth/google` which starts the authentication process with Google, just like we were testing on the server side
  // After successful authentication user will be redirected back to
  // client - side app with the cookie set

  <a className="login-button" href={`${SERVER_URL}/auth/google`}>
    <img src={GoogleLogo} alt="google logo" className="" />
    <span className="login-button__text">Login with Google</span>
  </a>
);

export default LoginButton;
