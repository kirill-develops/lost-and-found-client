/* eslint-disable react/prop-types */
import React from 'react';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import EditProfile from '../../components/EditProfile/EditProfile';
import './Profile.scss';

const Profile = ({ profileData, editProfile, toggleEditProfile }) => {

  const formatDate = (date) => {
    // Return date formatted as 'month/day/year'
    return (new Date(date)).toLocaleDateString('en-US');
  }

  return (
    <div className='profile'>
      <h2 className='profile__subheading'>
        <span>
          Hello, {profileData.first_name} {profileData.last_name}
        </span>
        <div className="profile__button-wrapper">
          <span
            onClick={() => toggleEditProfile((e) => !e)}
            className='profile__edit-button'
          >Edit Form</span>
          {/* Render a logout button */}
          <LogoutButton />
        </div>
      </h2>
      <div className='profile__frame'>
        <div className='profile__card--avatar'>
          <img
            className="profile__avatar"
            src={profileData.avatar_url}
            alt={`${profileData.first_name} avatar`}
          />
        </div>
        <div className='profile__card'>
          <h3 className='profile__card-title'>User Details</h3>
          <div className=''>
            <h3 className='profile__label'>Address:
              <span className='profile__body'> {profileData.address}</span></h3>
            <h3 className='profile__label'>City:
              <span className='profile__body'> {profileData.city}</span>
            </h3>
            <h3 className='profile__label'>Province:
              <span className='profile__body'> {profileData.province}</span>
            </h3>
          </div>
          <h3 className='profile__label'>Phone:
            <span className='profile__body'> {profileData.phone}</span>
          </h3>
          <h3 className='profile__label'>Registered since:
            <span className='profile__body'> {formatDate(profileData.updated_at)}</span>
          </h3>
        </div>
        <div className='profile__card'>
          <h3 className='profile__card-title'>User Metrics</h3>
          <h3 className='profile__label'>Open Offers: </h3>
          <h3 className='profile__label'>Open Seeking: </h3>
          <h3 className='profile__label'>New Messages: </h3>
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
}

export default Profile