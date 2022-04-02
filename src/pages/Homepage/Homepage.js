/* eslint-disable react/prop-types */
import React, { Component } from "react";
import apiUtils from "../../utils/apiUtils";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import './Homepage.scss';

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
        <div className="homepage__header">

          <h1>Lost & FOUND</h1>
          <h2>Global support, locally sourced</h2>
          <LoginButton />
          <LogoutButton />
        </div>
      </section>
    );
  }
};

export default HomePage;