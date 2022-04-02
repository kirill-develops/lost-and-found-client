/* eslint-disable react/prop-types */
import React, { Component } from "react";
import apiUtils from "../../utils/apiUtils";
import './Homepage.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5050";

class HomePage extends Component {
  state = {
    isAuthenticating: true,
    isLoggedIn: false,
  }


  componentDidMount() {
    // apiUtils
    //   .getProfile()
    //   .then(_res => {
    //     console.log("🚀 ~ file: Homepage.js ~ line 18 ~ HomePage ~ componentDidMount ~ _res", _res);
    //     this.props.history.push('/dashboard');
    //   })
    //   .catch(_err => {
    //     this.setState({ isAuthenticating: false });
    //   })
  }

  render() {

    // if (this.state.isAuthenticating) return null;

    return (
      <section className="homepage">
        <div className="homepage__header">
          <div className="homepage__header-block">
            <h1>Global support, locally sourced</h1>
            <h2 className="homepage__subheader">Because no one should face their toughest challenges alone</h2>
          </div>
        </div>
        <div className="homepage__intro">
          <div className="homepage__intro-block">
            <p>With a pay it forward system.</p>
            <p>At Lost & Found we take pride in directly connecting those who are motivated to help but may not know where to start and share a general concern of how far their contributions go through traditional channels.
              Through a direct connection, we can mitigate managerial costs and focus on spending resources where it counts. You as a vollunteer will also benefit greatly with a deeper connection to those you will impact. If you are ready to help, please <a href={`${SERVER_URL}/auth/google`}>click here</a> to connect with your Google account and begin the sign-up process.  Whether it&apos;s someone going through an unfortunate chapter, or a family seeking refuge from a situation out of their control, they can use your support now.  </p>
          </div>
        </div>
      </section>
    );
  }
};

export default HomePage;