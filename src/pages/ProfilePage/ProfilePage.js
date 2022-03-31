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
    isFormFilled: false
  }

  handleFormSubmit = () => {
    this.setState({ isFormFilled: true })
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
          isFormFilled: true
        })

        const { city, phone, province, volunteer, first_name, last_name } = this.state.profileData;

        if (!city || !phone || !province || !volunteer || !first_name || !last_name) {
          this.setState({
            isFormFilled: false
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

  formatDate = (date) => {
    // Return date formatted as 'month/day/year'
    return (new Date(date)).toLocaleDateString('en-US');
  }

  render() {
    const { isAuthenticating, isLoggedIn, profileData, isFormFilled } = this.state;

    // While the component is authenticating, do not render anything (alternatively, this can be a preloader)
    if (isAuthenticating) return null;

    return (
      <section className="profile-page">
        <h1>Profile Page</h1>

        {/* If user is logged in, render their profile information */}
        {isLoggedIn ? (
          isFormFilled ? (
            profileData && (
              <>
                <h2>Hello, {profileData.first_name} {profileData.last_name}</h2>
                <h3>Registered since: {this.formatDate(profileData.updated_at)}</h3>
                <h3>address: {profileData.address}</h3>
                <h3>city: {profileData.city}</h3>
                <h3>province: {profileData.province}</h3>
                <h3>phone: {profileData.phone}</h3>
                <img
                  className="profile-page__avatar"
                  src={profileData.avatar_url}
                  alt={`${profileData.username} avatar`}
                />
                <div className="profile-page__logout-wrapper">
                  {/* Render a logout button */}
                  <LogoutButton />
                </div>
              </>
            )

          ) : (
            // If user's form is not filled out, render EditForm Component
            <EditForm
              profileData={profileData}
              handleFormSubmit={this.handleFormSubmit}
            />)
        ) : (
          // If user is not logged in, render a login button
          <>
            <p><strong>This page requires authentication.</strong></p>
            <LoginButton />
          </>
        )}
      </section>
    );
  }
}

export default ProfilePage;