/* eslint-disable sort-imports */
//! /* eslint-disable react/prop-types */
import './ProfilePage.scss';
import React, { useState } from 'react';
import isProfileComplete from '../../utils/isProfileComplete';
import LoginButton from '../../components/LoginButton/LoginButton';
import Profile from '../../components/Profile/Profile';

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

const ProfilePage = ({ userData }) => {
  const [editProfile, toggleEditProfile] = useState(false);
  (userData.id && !isProfileComplete(userData)) && toggleEditProfile(true);

  // While the component is authenticating, do not render anything
  // (alternatively, this can be a preloader)
  return (
    <section className="profile-page">
      <div className="profile-page__block">
        <h1 className="profile-page__title">Profile Page</h1>

        {/* If user is logged in, render their profile information */}
        {userData.id ? (
          <Profile
            userData={userData}
            editProfile={editProfile}
            toggleEditProfile={toggleEditProfile}
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
