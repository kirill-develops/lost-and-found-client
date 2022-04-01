// NavLink component allows us to define an active CSS class for the page we are currently on
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/images/site-logo.svg';
import Hamburger from '../../assets/icons/menu-outline.svg'
import './Header.scss';



const Header = () => {
  return (
    <section className="header">
      <div className="header__block">
        <Link className="header__link" to="/">
          <img src={Logo}
            alt='Lost & FOUND logo'
            className='header__logo' />
        </Link>
        <nav className="header__nav">
          <div
            onClick=''
            className='header__menu-btn'
          >
            <img src={Hamburger} alt='menu icon' className="header__icon" />
            Menu
          </div>
          {/*           
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
          </NavLink> */}
        </nav>
      </div>
    </section>
  );
};

export default Header;