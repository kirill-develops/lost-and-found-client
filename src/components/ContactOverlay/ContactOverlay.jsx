/* eslint react/prop-types: 0 */
import React from 'react';
import closeIco from '../../assets/icons/x_close.svg';
import './ContactOverlay.scss';

const ContactOverlay = (
  {
    setContact,
    contactState,
  },
) => (
  <div className="contact">
    <div className="slide-inelliptic-bottom-bck">
      <div className="contact__block">
        <button
          type="button"
          onClick={() => setContact(!contactState)}
          onKeyUp={(e) => e.key === 'Escape' && setContact(!contactState)}
          className="contact__close-ico-wrapper"
        >
          <img
            src={closeIco}
            alt="close icon"
            className="contact__close-ico"
          />
        </button>
        <h2 className="contact__title">
          Kirill&apos;s Contacts
        </h2>
        <div className="contact__filler" />
        <form className="contact__form">
          <h4 className="contact__label">
            LinkedIn
            <p className="contact__field--linkedin">
              https://www.LinkedIn.com/in/
              <span>
                Kirill-Tchentsov/
              </span>
            </p>
          </h4>
          <h4 className="contact__label">
            GitHub
            <p className="contact__field--github">
              https://github.com/
              <span>
                kirill-develops/
              </span>
            </p>
          </h4>
          <div className="contact__button-block">
            <button
              type="button"
              onClick={() => setContact(!contactState)}
              className="contact__button--cancel"
            >
              HIRE
            </button>
            <button
              type="button"
              onClick={() => setContact(!contactState)}
              className="contact__button--submit"
            >
              HIRE, BUT IN BLUE
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default ContactOverlay;
