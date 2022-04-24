/* eslint-disable sort-imports */
//! /* eslint-disable react/prop-types */
import './ProfilePage.scss';
import React, { useCallback, useEffect, useState } from 'react';
import isProfileComplete from '../../utils/isProfileComplete';
import LoginButton from '../../components/LoginButton/LoginButton';
import Profile from '../../components/Profile/Profile';
import BackButton from '../../components/BackButton/BackButton';

// type userData = {
//   userData: {
//     first_name: string,
//     last_name: string,
//     address: ?string,
//     city: string,
//     province: string,
//     phone: number,
//     volunteer: boolean,
//     postal: string,
//     avatar_url: ?string,
//     updated_at: string
//   }
// }

const ProfilePage = ({ userData, setUserData }) => {
  const [editProfile, toggleEditProfile] = useState(false);

  const toggleEdit = useCallback(() => (
    userData.id && !isProfileComplete(userData) && toggleEditProfile(true)
  ), [userData]);

  useEffect(() => {
    toggleEdit();
  }, [toggleEdit]);
  // (userData.id && !isProfileComplete(userData)) && toggleEditProfile(true) }

  // While the component is authenticating, do not render anything
  // (alternatively, this can be a preloader)
  return (
    <section className="profile-page">
      <div className="profile-page__block">
        <div className="profile-page__title-wrapper">
          <BackButton />
          <h1 className="profile-page__title">Profile Page</h1>
        </div>

        {/* If user is logged in, render their profile information */}
        {userData.id ? (
          <Profile
            userData={userData}
            editProfile={editProfile}
            toggleEditProfile={toggleEditProfile}
            setUserData={setUserData}
          />
        ) : (
          // If user is not logged in, render a login button
          <>
            <p>
              <strong>
                This page requires authentication.
              </strong>
            </p>
            <LoginButton />
          </>
        )}
      </div>
    </section>
  );
};

export default React.memo(ProfilePage);
