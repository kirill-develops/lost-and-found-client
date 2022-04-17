/* eslint-disable react/prop-types */
import React from 'react';
import closeIco from '../../assets/icons/x_close.svg';
import './ContactOverlay.scss';

const ContactOverlay = ({ setContact, contactState }) => {
  return (
    <div className='contact'>
      <div className='slide-inelliptic-bottom-bck'>
        <div className='contact__block'>
          <img
            onClick={() => setContact(!contactState)}
            src={closeIco}
            alt='close icon'
            className='contact__close-ico' />
          <h2 className='contact__title'>
            Kirill&apos;s Contacts
          </h2>
          <div className={'contact__filler'}></div>
          <form className='contact__form'>
            <label className='contact__label'>
              LinkedIn
              <p
                className='contact__field--linkedin'>
                https://www.LinkedIn.com/in/<span>
                  Kirill-Tchentsov/
                </span>
              </p>
            </label>
            <label className='contact__label'>
              GitHub
              <p
                className='contact__field--github'>
                https://github.com/<span>
                  kirill-develops/
                </span>
              </p>
            </label>
            <div className='contact__button-block'>
              <button
                onClick={() => setContact(!contactState)}
                className='contact__button--cancel'>HIRE</button>
              <button className='contact__button--submit'>
                HIRE, BUT IN BLUE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactOverlay;