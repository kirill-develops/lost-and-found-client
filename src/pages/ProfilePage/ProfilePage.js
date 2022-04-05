/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import apiUtils from '../../utils/apiUtils';
import LoginButton from '../../components/LoginButton/LoginButton';
import LogoutButton from '../../components/LogoutButton/LogoutButton';
import EditForm from '../../components/EditForm/EditForm';
import './ProfilePage.scss';

class ProfilePage extends Component {
  // Keep track of four things in state: 
  // - authentication process state (default: in process of authenticating)
  // - whether user is logged (default: not logged in)
  // - profile data for logged in user (default: profile data is null)
  // - is user's form filled out
  state = {
    isAuthenticating: true,
    isLoggedIn: false,
    profileData: null,
    editProfile: false,
  }

  handleFormSubmit = () => {
    apiUtils.getProfile()
      .then(res => {
        this.setState({
          editProfile: false, profileData: res.data
        })
      })
      .catch(err => {
        // If we are getting back 401 (Unauthorized) back from the server, means we need to log in
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
          this.setState({
            isAuthenticating: false,
            isLoggedIn: false
          });
        } else {
          console.log('Error authenticating', err);
          this.setState({ isAuthenticating: false })
        }
      })
  }

  handleCancel = () => {
    this.setState({ editProfile: false });
  }

  formatDate = (date) => {
    // Return date formatted as 'month/day/year'
    return (new Date(date)).toLocaleDateString('en-US');
  }

  componentDidMount() {
    // Send a GET request for profile information
    // If user is currently logged in, we will get profile data, if they are not logged in, we will get 401 (Unauthorized) that we can handle in `.catch`
    // Note that we need to use `withCredentials` in order to pass the cookie to a server
    apiUtils.getProfile()
      .then(res => {
        // Update the state: done authenticating, user is logged in, set the profile data
        this.setState({
          isAuthenticating: false,
          isLoggedIn: true,
          profileData: res.data,
          editProfile: false
        })

        const { city, phone, province, volunteer, first_name, last_name } = this.state.profileData;

        if (!city || !phone || !province || !volunteer || !first_name || !last_name) {
          this.setState({
            editProfile: true
          })
        };
      })
      .catch(err => {
        // If we are getting back 401 (Unauthorized) back from the server, means we need to log in
        if (err.response.status === 401) {
          // Update the state: done authenticating, user is not logged in
          this.setState({
            isAuthenticating: false,
            isLoggedIn: false
          });
        } else {
          console.log('Error authenticating', err);
          this.setState({ isAuthenticating: false })
        }
      });
  }

  render() {
    const { isAuthenticating, isLoggedIn, profileData, editProfile } = this.state;

    // While the component is authenticating, do not render anything (alternatively, this can be a preloader)
    if (isAuthenticating) return null;

    return (

      <section className="profile-page">
        <div className="profile-page__block">
          <h1 className="profile-page__title">Profile Page</h1>

          {/* If user is logged in, render their profile information */}
          {isLoggedIn ? (
            profileData && (
              editProfile ?
                // If user's form is not filled out, render EditForm Component
                <EditForm
                  profileData={profileData}
                  handleFormSubmit={this.handleFormSubmit}
                  handleCancel={this.handleCancel}
                />
                :
                < div className='profile-card'>
                  <h2 className='profile-card__title'>
                    <span>
                      Hello, {profileData.first_name} {profileData.last_name}
                    </span>
                    <div className="profile-card__logout-wrapper">
                      <span
                        onClick={() => this.setState({ editProfile: true })}
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
                    <div className='profile-card__user-details'>
                      <h3 className='profile-card__subheading'>User Details</h3>
                      <h3 className='profile-card__label'>Address: {profileData.address}</h3>
                      <h3 className='profile-card__label'>City: {profileData.city}</h3>
                      <h3 className='profile-card__label'>Province: {profileData.province}</h3>
                      <h3 className='profile-card__label'>Phone: {profileData.phone}</h3>
                      <h3 className='profile-card__label'>Registered since: {this.formatDate(profileData.updated_at)}</h3>
                    </div>
                    <div className='profile-card__user-metrics'>
                      <h3 className='profile-card__subheading'>User Metrics</h3>
                      <h3 className='profile-card__label'>Open Offers: </h3>
                      <h3 className='profile-card__label'>Open Seeking: </h3>
                      <h3 className='profile-card__label'>New Messages: </h3>
                    </div>
                  </div>
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
      </section>
    );
  }
}

export default ProfilePage;