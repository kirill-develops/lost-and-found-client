/* eslint-disable sort-imports */
// ! /* eslint-disable react/prop-types */
import './UserPage.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiUtils from '../../utils/apiUtils';
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

// Return date formatted as 'month/day/year'
const formatDate = (date) => (new Date(date)).toLocaleDateString('en-US');

const UserPage = ({ isLoggedIn }) => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(
    () => apiUtils.getProfileById(id).then((res) => {
      setIsLoading(false);
      setUserData(res.data);
    })
      .catch((err) => console.log(err)),
    [id],
  );

  return isLoading ? null : (
    <section className="user-page">
      <div className="user-page__block">
        <div className="user-page__title-wrapper">
          <BackButton />
          <h1 className="user-page__title">
            {userData.volunteer === 1
              ? 'Volunteer' : 'Seeker'}
            {' '}
            Page
          </h1>
        </div>
        {/* If user is logged in, render their profile information */}
        <div className="user">
          <h2 className={userData.volunteer === 1 ? 'user__subheading--offer' : 'user__subheading--seeking'}>
            <span>
              Meet
              {' '}
              {userData.first_name}
              {isLoggedIn && (
                <span>
                  {' '}
                  {userData.last_name}
                </span>
              )}
              !
            </span>
          </h2>
          <div className="user__frame">
            <div className="user__card--avatar">
              <img
                className="user__avatar"
                src={userData.avatar_url}
                alt={`${userData.first_name}'s avatar`}
              />
            </div>
            <div className="user__card">
              <h3 className={userData.volunteer === 1 ? 'user__card-title--offer' : 'user__card-title--seeking'}>User Details</h3>
              <div className="user__address-block">
                <h3 className="user__label">
                  Address:
                </h3>
                <div className="user__address-details">
                  <h4 className="user__body">
                    {' '}
                    {userData.address}
                  </h4>
                  <span className="user__body">
                    {' '}
                    {userData.city}
                    ,
                  </span>
                  <span className="user__body">
                    {' '}
                    {userData.province}
                  </span>
                </div>
              </div>
              <h3 className="user__label">
                Phone:
                <span className="user__body">
                  {' '}
                  {userData.phone}
                </span>
              </h3>
              <h3 className="user__label">
                Registered since:
                <span className="user__body">
                  {' '}
                  {formatDate(userData.updated_at)}
                </span>
              </h3>
            </div>
            <div className="user__card">
              <h3 className={userData.volunteer === 1 ? 'user__card-title--offer' : 'user__card-title--seeking'}>User Metrics</h3>
              <h3 className="user__label">Open Offers: </h3>
              <h3 className="user__label">Open Seeking: </h3>
              <h3 className="user__label">New Messages: </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(UserPage);
