/* eslint-disable react/prop-types */
// NavLink component allows us to define an active CSS class for the page we are currently on
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import Logo from '../../assets/images/Asset_36.svg';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import './Header.scss';

class Header extends Component {
  state = {
    menu: false
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange(state) {
    this.setState({ menu: state.isOpen })
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu() {
    this.setState({ menu: false })
  }

  render() {
    return (
      <section className="header">
        <div className="header__block">
          <Link className="header__link" to="/">
            <img src={Logo}
              alt='Lost & FOUND logo'
              className='header__logo' />
          </Link>
          <div className='header__menu-block'>
            {this.props.userName ? <h3>Welcome Back, {this.props.userName}</h3> : <LoginButton />}
            <nav className="header__hamburger-block">
              <Menu
                isOpen={this.state.menu}
                over
                disableOverlayClick={true}
                onStateChange={(state) => this.handleStateChange(state)}
                outerContainerId='menu-outer'
                pageWrapId='menu-wrapper'
                className='menu'
                width={'320px'}
                right >
                <Link
                  to='/' id='home'
                  onClick={() => this.closeMenu()}
                  className='header__menu-item'>
                  Home</Link>
                <Link
                  to='/dashboard'
                  onClick={() => this.closeMenu()}
                  className='header__menu-item'>
                  Dashboard</Link>
                <Link
                  to='/profile'
                  onClick={() => this.closeMenu()}
                  className='header__menu-item'>
                  Profile</Link>
                <LoginButton />
                <LogoutButton />
              </Menu >
            </nav>
          </div>
        </div>
      </section >
    );
  }
};

export default Header;