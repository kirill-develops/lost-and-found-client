/* eslint-disable sort-imports */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import './Homepage.scss';
import { Link } from 'react-router-dom';
import React, { useCallback, useState } from 'react';
import ContactOverlay from '../../components/ContactOverlay/ContactOverlay';
import HomepageSwiper from '../../components/HomepageSwiper/HomepageSwiper';
import useMediaQuery from '../../utils/useMediaQuery';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5050';

const HomePage = ({ isLoggedIn }) => {
  const [contact, setContact] = useState(false);
  const isDashNavMobile = useMediaQuery('(max-width:48rem)');

  const setContactTo = useCallback(() => { setContact(); }, [setContact]);

  return (
    <section className="homepage">
      <div className="homepage__header">
        <div className="homepage__header-block">
          <h1>Global support, locally sourced</h1>
          <h2 className="homepage__subheader">Because no one should face their toughest challenges alone</h2>
        </div>
      </div>

      {!isDashNavMobile && <HomepageSwiper />}

      <div className="homepage__intro">
        <div className="homepage__intro-block">
          <div className="homepage__intro-block--left">
            <p>
              Welcome to
              {' '}
              <i>Lost&Found.</i>
              {' '}
              We&apos;re glad you&apos;ve made it :)
            </p>
            <p>
              With a pay it forward system, our goal is to equip those in need with the ability to provide. Most of our vollunteers are long time contributers, however in the old model, NFPs rarely communicated with one another, thus leaving a lot of potential lost in the process due to primitive channels of information, leading to poor efficiency.
            </p>
            <p>
              Until Now.
            </p>
            <p>
              With the open source ideals developed into Lost & FOUND, we&apos;ve given birth to a communally run, centralized communication port driven by the one&apos;s who care most, the vollunteers.
            </p>
          </div>
          <div className="homepage__intro-block--right">
            <p>
              At Lost & Found we take pride in directly connecting those who are motivated to help but may not know where to start or may have a concern of how far their contributions go through traditional channels. Through a direct connection, we can mitigate managment costs and focus on spending resources where it counts. You as a vollunteer will also benefit greatly with a deeper connection to those you will impact and be able to grow your network as new friends settle in and adapt with your guidance.
              <span className={isLoggedIn
                ? 'homepage__link--disabled' : 'homepage__link'}
              >
                If you are ready to help, please
                {' '}
                <Link
                  disabled={!!isLoggedIn}
                  to={`${SERVER_URL}/auth/google`}
                >
                  click here
                </Link>
                {' '}
                to connect with your Google account and begin the sign-up process.
              </span>
              {' '}
              Whether it&apos;s someone going through an unfortunate chapter, or a family seeking refuge from a situation out of their control, they can use your support now.
            </p>
          </div>
        </div>
      </div>
      {contact === true && (
        <ContactOverlay
          setContact={setContactTo}
          contactState={contact}
        />
      )}
    </section>
  );
};

export default React.memo(HomePage);
