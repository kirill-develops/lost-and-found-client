/* eslint-disable sort-imports */
// ! /* eslint-disable react/prop-types */
import './ProfilePage.scss';
import React from 'react';
import LoginButton from '../../components/buttons/LoginButton/LoginButton';
import Profile from '../../components/Profile/Profile';
import BackButton from '../../components/buttons/BackButton/BackButton';

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

const ProfilePage = ({ userData }) => (
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

export default React.memo(ProfilePage);
