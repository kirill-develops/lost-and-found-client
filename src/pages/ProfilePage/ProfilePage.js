/* eslint-disable react/prop-types */
import React, { useState, useEffect, useReducer } from 'react';
import apiUtils from '../../utils/apiUtils';
import LoginButton from '../../components/LoginButton/LoginButton';
import isProfileComplete from '../../utils/isProfileComplete';
import './ProfilePage.scss';
import Profile from '../../components/Profile/Profile';

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

  useEffect(() => {
    // Send a GET request for profile information
    apiUtils.getProfile()
      .then(res => {
        // Update the state: done authenticating, user is logged in, set the
        // profile data
        setAuthenticating(false);
        setLoggedIn(true);
        setProfileData(res.data);
        !isProfileComplete(res.data) ? toggleEditProfile(true) : "";
      })
      .catch(err => {
        // If we are getting back 401 (Unauthorized) back from the server, means
        // we need to log in
        err.response.status === 401 ? (
          // Update the state: done authenticating, user is not logged in
          setAuthenticating(false),
          setLoggedIn(false)
        ) : (
          console.log('Error authenticating', err),
          setAuthenticating(false)
        )
      });
  }, [editProfile]);

  // While the component is authenticating, do not render anything (alternatively, this can be a preloader)
  return isAuthenticating ? (
    null
  ) : (
    <section className="profile-page">
      <div className="profile-page__block">
        <h1 className="profile-page__title">Profile Page</h1>

        {/* If user is logged in, render their profile information */}
        {isLoggedIn ? (
          profileData && (
            <Profile profileData={profileData} editProfile={editProfile} toggleEditProfile={toggleEditProfile} />
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