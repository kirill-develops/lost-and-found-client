/* eslint-disable react/prop-types */
// NavLink component allows us to define an active CSS class for the page we are currently on
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import Logo from '../../assets/images/Asset_36.svg';
import LoginButton from '../LoginButton/LoginButton';
import LogoutButton from '../LogoutButton/LogoutButton';
import GitHubLogo from '../../assets/icons/logo-github.svg';
import LinkedinLogo from '../../assets/icons/logo-linkedin.svg';
import GmailLogo from '../../assets/icons/gmail_icon.svg';
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
                <div>
                  <div className='bm-item-block'>

                    <div className=''>
                      {!this.props.userName ?
                        <LoginButton /> :
                        <LogoutButton />}
                    </div>
                    <Link
                      to='/' id='home'
                      onClick={() => this.closeMenu()}
                      className='header__menu-item bm-item'>
                      HOME</Link>
                    <Link
                      to='/dashboard'
                      onClick={() => this.closeMenu()}
                      className='header__menu-item bm-item'>
                      DASHBOARD</Link>
                    <Link
                      to='/profile'
                      onClick={() => this.closeMenu()}
                      className='header__menu-item bm-item'>
                      PROFILE</Link>
                    <p className='bm-item'>MAP (Coming Soon)</p>
                    <p className='bm-item'>MESSENGER (Coming Soon)</p>
                  </div>
                </div>
                <div className='bm-custom__block'>
                  <label className='bm-custom__label'>Developer Details</label>
                  <ul className='bm-custom__list'>
                    <li className='bm-custom__list-item bm-item'>
                      <a href='https://github.com/kirill-develops/' className='bm-custom__link'>
                        <img src={GitHubLogo} alt='GitHub logo' className='bm-custom__logo' />
                      </a>
                    </li>
                    <li className='bm-custom__list-item bm-item'>
                      <a href='mailto:kirill.develops@gmail.com' className='bm-custom__link'>
                        <img src={GmailLogo} alt='LinkedIn logo' className='bm-custom__logo' />
                      </a>
                    </li>
                    <li className='bm-custom__list-item bm-item'>
                      <a href='https://www.linkedin.com/in/kirill-tchentsov/' className='bm-custom__link'>
                        <img src={LinkedinLogo} alt='LinkedIn logo' className='bm-custom__logo' />
                      </a>
                    </li>
                  </ul>
                </div>
              </Menu >
            </nav>
          </div>
        </div>
      </section >
    );
  };
};

export default Header;