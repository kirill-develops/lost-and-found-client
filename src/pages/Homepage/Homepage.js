/* eslint-disable react/prop-types */
import axios from "axios";
import React, { Component } from "react";
import LoginButton from "../../components/LoginButton/LoginButton";
import LogoutButton from "../../components/LogoutButton/LogoutButton";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


class HomePage extends Component {
  state = {
    isAuthenticating: true,
    isLoggedIn: false,
  }

  componentDidMount() {
    axios
      .get(`${SERVER_URL}/auth/profile`,
        { withCredentials: true })
      .then(_res => {
        console.log("🚀 ~ file: Homepage.js ~ line 18 ~ HomePage ~ componentDidMount ~ _res", _res)

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