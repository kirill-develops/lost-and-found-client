/* eslint-disable react/prop-types */
import React, { Component } from "react";
import apiUtils from "../../utils/apiUtils";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";


class HomePage extends Component {
  state = {
    isAuthenticating: true,
    isLoggedIn: false,
  }

  componentDidMount() {
    apiUtils
      .getProfile()
      .then(_res => {
        this.props.history.push('/dashboard');
      })
      .catch(_err => {
        this.setState({ isAuthenticating: false });
      })
  }

  render() {

    if (this.state.isAuthenticating) return null;

    return (
      <section>
        <h1>Welcome to Lost&FOUND!</h1>
        <p>Your go to source for all things dev related.</p>
        <LoginButton />
        <LogoutButton />
      </section>
    );
  }
};

export default HomePage;