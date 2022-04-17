/* eslint-disable react/prop-types */
import React, { useState, useEffect, useReducer } from 'react';
import apiUtils from '../../utils/apiUtils';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import EditProfile from '../../components/EditProfile/EditProfile';
import isProfileComplete from '../../utils/isProfileComplete';
import './ProfilePage.scss';

const ProfilePage = () => {
  // Keep track of four things in state: 
  // - authentication process state (default: in process of authenticating)
  // - whether user is logged (default: not logged in)
  // - profile data for logged in user (default: profile data is null)
  // - does the user want to editProfile (default: false)
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editProfile, toggleEditProfile] = useState(false);


  const formatDate = (date) => {
    // Return date formatted as 'month/day/year'
    return (new Date(date)).toLocaleDateString('en-US');
  }

  useEffect(() => {
    // Send a GET request for profile information
    apiUtils.getProfile()
      .then(res => {
        // Update the state: done authenticating, user is logged in, set the
        // profile data
        setAuthenticating(false);
        setLoggedIn(true);
        setProfileData(res.data);
        !isProfileComplete(res.data) ? toggleEditProfile((e) => !e) : "";
      })
      .catch(err => {
        // If we are getting back 401 (Unauthorized) back from the server, means
        // we need to log in
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
          setAuthenticating(false);
          setLoggedIn(false);
        } else {
          console.log('Error authenticating', err);
          setAuthenticating(false);
        }
      });
  }, [editProfile]);

  // While the component is authenticating, do not render anything (alternatively, this can be a preloader)
  if (isAuthenticating) return null;

  return (

    <section className="profile-page">
      <div className="profile-page__block">
        <h1 className="profile-page__title">Profile Page</h1>

        {/* If user is logged in, render their profile information */}
        {isLoggedIn ? (
          profileData && (
            <div className='profile-card'>
              <h2 className='profile-card__title'>
                <span>
                  Hello, {profileData.first_name} {profileData.last_name}
                </span>
                <div className="profile-card__logout-wrapper">
                  <span
                    onClick={() => toggleEditProfile((e) => !e)}
                    className='profile-card__edit-button'
                  >Edit Form</span>
                  {/* Render a logout button */}
                  <LogoutButton />
                </div>
              </h2>
              <div className='profile-card__frame'>
                <div className='profile-card__avatar-frame'>
                  <img
                    className="profile-card__avatar"
                    src={profileData.avatar_url}
                    alt={`${profileData.first_name} avatar`}
                  />
                </div>
                <div className='profile-card__user-frame'>
                  <h3 className='profile-card__subheading'>User Details</h3>
                  <div className=''>
                    <h3 className='profile-card__label'>Address:
                      <span className='profile-card__body'> {profileData.address}</span></h3>
                    <h3 className='profile-card__label'>City:
                      <span className='profile-card__body'> {profileData.city}</span>
                    </h3>
                    <h3 className='profile-card__label'>Province:
                      <span className='profile-card__body'> {profileData.province}</span>
                    </h3>
                  </div>
                  <h3 className='profile-card__label'>Phone:
                    <span className='profile-card__body'> {profileData.phone}</span>
                  </h3>
                  <h3 className='profile-card__label'>Registered since:
                    <span className='profile-card__body'> {formatDate(profileData.updated_at)}</span>
                  </h3>
                </div>
                <div className='profile-card__user-frame'>
                  <h3 className='profile-card__subheading'>User Metrics</h3>
                  <h3 className='profile-card__label'>Open Offers: </h3>
                  <h3 className='profile-card__label'>Open Seeking: </h3>
                  <h3 className='profile-card__label'>New Messages: </h3>
                </div>
              </div>
              {// If user's form is not filled out or user toggles to edit form, render EditForm Component
                editProfile &&
                <EditProfile
                  profileData={profileData}
                  // handleFormSubmit={handleFormSubmit}
                  toggleEditProfile={toggleEditProfile}
                />
              }
            </div>
          )
        ) : (
          // If user is not logged in, render a login button
          <>
            <p><strong>This page requires authentication.</strong></p>
            <LoginButton />
          </>
        )}
      </div>
    </section >
  );
};

export default ProfilePage;