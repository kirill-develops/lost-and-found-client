// NavLink component allows us to define an active CSS class for the page we are currently on
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <section className="header">
      <div className="header__banner"></div>
      <div className="header__bottom">
        <Link className="header__logo" to="/">Lost&FOUND</Link>
        <nav className="header__nav">
          <NavLink
            to="/"
            exact
            className="header__nav-link"
            activeClassName="header__nav-link--active"
          >
            Home
          </NavLink>
          <NavLink
            to="/profile"
            exact
            className="header__nav-link"
            activeClassName="header__nav-link--active"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard"
            exact
            className="header__nav-link"
            activeClassName="header__nav-link--active"
          >
            Dashboard
          </NavLink>
        </nav>
      </div>
    </section>
  );
};

export default Header;