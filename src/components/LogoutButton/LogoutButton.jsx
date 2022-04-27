import './LogoutButton.scss';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const LogoutButton = () => (
  // The link will take user to `http://localhost:5050/auth/logout` which will delete the user server session and redirect user back to client-side app with the cookie invalidated
  <a className="logout-button" href={`${SERVER_URL}/auth/logout`}>
    {/* Logout icon SVG */}
    <FiLogOut size={28} />
    <span className="logout-button__text">Logout</span>
  </a>
);

export default React.memo(LogoutButton);
