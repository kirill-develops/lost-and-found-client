/* eslint-disable sort-imports */
import './Profile.scss';
import React from 'react';
import EditProfile from '../EditProfile/EditProfile';
import LogoutButton from '../LogoutButton/LogoutButton';

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

// Return date formatted as 'month/day/year'
const formatDate = (date) => (new Date(date)).toLocaleDateString('en-US');

const Profile = ({
  userData,
  setUserData,
  editProfile,
  toggleEditProfile,
}) => (
  <div className="profile">
    <h2 className="profile__subheading">
      <span>
        Hello,
        {' '}
        {userData.first_name}
        {' '}
        {userData.last_name}
      </span>
      <div className="profile__button-wrapper">
        <button
          type="button"
          onClick={() => toggleEditProfile((e) => !e)}
          className="profile__edit-button"
        >
          Edit Form
        </button>
        {/* Render a logout button */}
        <LogoutButton />
      </div>
    </h2>
    <div className="profile__frame">
      <div className="profile__card--avatar">
        <img
          className="profile__avatar"
          src={userData.avatar_url}
          alt={`${userData.first_name} avatar`}
        />
      </div>
      <div className="profile__card">
        <h3 className="profile__card-title">User Details</h3>
        <div className="profile__address-block">
          <h3 className="profile__label">
            Address:
          </h3>
          <div className="profile__address-details">
            <h4 className="profile__body">
              {' '}
              {userData.address}
            </h4>
            <span className="profile__body">
              {' '}
              {userData.city}
              ,
            </span>
            <span className="profile__body">
              {' '}
              {userData.province}
            </span>
          </div>
        </div>
        <h3 className="profile__label">
          Phone:
          <span className="profile__body">
            {' '}
            {userData.phone}
          </span>
        </h3>
        <h3 className="profile__label">
          Registered since:
          <span className="profile__body">
            {' '}
            {formatDate(userData.updated_at)}
          </span>
        </h3>
      </div>
      <div className="profile__card">
        <h3 className="profile__card-title">User Metrics</h3>
        <h3 className="profile__label">Open Offers: </h3>
        <h3 className="profile__label">Open Seeking: </h3>
        <h3 className="profile__label">New Messages: </h3>
      </div>
    </div>
    {// If user's form is not filled out or user toggles to edit form, render EditForm Component
      editProfile && (
        <EditProfile
          userData={userData}
          setUserData={setUserData}
          toggleEditProfile={toggleEditProfile}
        />
      )
    }
  </div>
);

export default Profile;
