/* eslint-disable sort-imports */
import './Footer.scss';
import React from 'react';
import Icon from '../../assets/icons/favicon.svg';

const Footer = () => (
  <div className="footer">
    <div className="footer__block">
      <p className="footer__body">© Lost & Found, All rights reserved.</p>
      <img src={Icon} alt="Lost & Found Icon" className="footer__ico" />
    </div>
  </div>
);

export default React.memo(Footer);
