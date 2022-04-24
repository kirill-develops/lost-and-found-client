/* eslint-disable sort-imports */
/* eslint-disable react/jsx-props-no-spreading */
import './Header.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import GitHubLogo from '../../assets/icons/logo-github.svg';
import GmailLogo from '../../assets/icons/gmail_icon.svg';
import LinkedinLogo from '../../assets/icons/logo-linkedin.svg';
import LoginButton from '../LoginButton/LoginButton';
import Logo from '../../assets/images/Asset_36.svg';
import LogoutButton from '../LogoutButton/LogoutButton';

const Header = ({ userName }) => {
  const [menu, setMenu] = useState(false);

  const menuLinkProps = {
    onClick: () => setMenu(false),
    className: 'header__menu-item bm-item',
  };

  return (
    <section className="header">
      <div className="header__block">
        <Link
          to="/"
          className="header__link"
        >
          <img
            src={Logo}
            alt="Lost & FOUND logo"
            className="header__logo"
          />
        </Link>
        <div className="header__menu-block">
          {userName ? (
            <h3>
              Welcome Back,
              {' '}
              {userName}
            </h3>
          ) : (
            <LoginButton />
          )}
          <nav className="header__hamburger-block">
            <Menu
              isOpen={menu}
              over
              disableOverlayClick
              onStateChange={(state) => setMenu(state.isOpen)}
              outerContainerId="menu-outer"
              pageWrapId="menu-wrapper"
              className="menu"
              width="320px"
              right
            >
              <div>
                <div className="bm-item-block">
                  <div className="">
                    {!userName
                      ? <LoginButton /> : <LogoutButton />}
                  </div>
                  <Link
                    to="/"
                    {...menuLinkProps}
                  >
                    HOME
                  </Link>
                  <Link
                    to="/dashboard"
                    {...menuLinkProps}
                  >
                    DASHBOARD
                  </Link>
                  <Link
                    to="/profile"
                    {...menuLinkProps}
                  >
                    PROFILE
                  </Link>
                  <p className="bm-item">MAP (Coming Soon)</p>
                  <p className="bm-item">MESSENGER (Coming Soon)</p>
                </div>
              </div>
              <div className="bm-custom__block">
                <h4 className="bm-custom__label">Developer Details</h4>
                <ul className="bm-custom__list">
                  <li className="bm-custom__list-item bm-item">
                    <a href="https://github.com/kirill-develops/" className="bm-custom__link">
                      <img src={GitHubLogo} alt="GitHub logo" className="bm-custom__logo" />
                    </a>
                  </li>
                  <li className="bm-custom__list-item bm-item">
                    <a href="mailto:kirill.develops@gmail.com" className="bm-custom__link">
                      <img src={GmailLogo} alt="LinkedIn logo" className="bm-custom__logo" />
                    </a>
                  </li>
                  <li className="bm-custom__list-item bm-item">
                    <a href="https://www.linkedin.com/in/kirill-tchentsov/" className="bm-custom__link">
                      <img src={LinkedinLogo} alt="LinkedIn logo" className="bm-custom__logo" />
                    </a>
                  </li>
                </ul>
              </div>
            </Menu>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Header);
