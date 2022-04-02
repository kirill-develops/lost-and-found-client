// NavLink component allows us to define an active CSS class for the page we are currently on
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { stack as Menu } from 'react-burger-menu';
import Logo from '../../assets/images/site-logo.svg';
import './Header.scss';

class Header extends Component {

  render() {

    return (
      <section className="header">
        <div className="header__block">
          <Link className="header__link" to="/">
            <img src={Logo}
              alt='Lost & FOUND logo'
              className='header__logo' />
          </Link>
          <nav className="header__menu-block">
            <Menu
              outerContainerId='menu-outer'
              pageWrapId='menu-wrapper'
              className='menu'
              width={'320px'}
              right >
              {/* <Link to='/' id='home' className='menu-item'>Home</Link>
              <Link to='/dashboard' id='dashboard' className='menu-item'>Dashboard</Link>;
              <Link to='/profile' id='profile' className='menu-item'>Profile</Link>; */}
            </Menu >
          </nav>
        </div>
      </section >
    );
  }
};

export default Header;