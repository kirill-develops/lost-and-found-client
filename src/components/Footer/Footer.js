import React from 'react';
import GitHubLogo from '../../assets/icons/logo-github.svg';
import LinkedinLogo from '../../assets/icons/logo-linkedin.svg';
import GmailLogo from '../../assets/icons/gmail_icon.svg';
import './Footer.scss';



const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__block'>
        <label to='/aboutDev' className='footer__label'>Developer Details</label>
        <ul className='footer__list'>
          <li className='footer__list-item'>
            <a href='https://github.com/kirill-develops/' className='footer__link'>
              <img src={GitHubLogo} alt='GitHub logo' className='footer__logo' />
              GitHub
            </a>
          </li>
          <li className='footer__list-item'>
            <a href='https://www.linkedin.com/in/kirill-tchentsov/' className='footer__link'>
              <img src={LinkedinLogo} alt='LinkedIn logo' className='footer__logo' />
              LinkedIn
            </a>
          </li>
          <li className='footer__list-item'>
            <a href='mailto:kirill.develops@gmail.com' className='footer__link'>
              <img src={GmailLogo} alt='LinkedIn logo' className='footer__logo' />
              kirill.develops@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div >
  )
}

export default Footer;