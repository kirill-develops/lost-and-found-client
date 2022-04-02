import React from 'react';
import './Footer.scss';



const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__block'>
        <label to='/aboutDev' className='footer__label'>Developer Details</label>
        <ul className='footer__list'>
          <li>
            <a href='https://github.com/kirill-develops/' className='footer__link'>GitHub</a>
          </li>
          <li>
            <a href='https://www.linkedin.com/in/kirill-tchentsov/' className='footer__link'>LinkedIn</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer;