/* eslint-disable sort-imports */
/* eslint-disable react/jsx-props-no-spreading */
import './Header.scss';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { push as Menu } from 'react-burger-menu';
import { SiGmail, SiGithub, SiLinkedin } from 'react-icons/si';
import LoginButton from '../buttons/LoginButton/LoginButton';
import Logo from '../../assets/images/Asset_36.svg';
import LogoutButton from '../buttons/LogoutButton/LogoutButton';

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
              overlayClassName="bm__overlay"
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
              <address className="bm__address">
                <h4 className="bm__label">Developer Details</h4>
                <section className="bm__list">
                  <a
                    href="https://github.com/kirill-develops/"
                    className="bm__logo--github"
                  >
                    <SiGithub size={28} />
                  </a>
                  <a
                    href="mailto:kirill.develops@gmail.com"
                    className="bm__logo--gmail"
                  >
                    <SiGmail size={28} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/kirill-tchentsov/"
                    className="bm__logo--linkedin"
                  >
                    <SiLinkedin size={28} />
                  </a>
                </section>
              </address>
            </Menu>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Header);
