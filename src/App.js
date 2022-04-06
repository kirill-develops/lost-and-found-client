/* eslint-disable object-curly-spacing */
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import apiUtils from './utils/apiUtils';

import Header from './components/Header/Header';
import HomePage from './pages/Homepage/Homepage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthFailPage from './pages/AuthFailPage/AuthFailPage';
import PostDetails from './pages/PostDetails/PostDetails';
import Footer from './components/Footer/Footer';
import './styles/App.scss';


class App extends Component {
  state = {
    isAuthenticating: true,
    isLoggedIn: false,
    userData: {}
  }

  componentDidMount() {
    apiUtils
      .getProfile()
      .then(res => {
        this.setState({ isLoggedIn: true, userData: res.data });
      })
      .catch(_err => {
        this.setState({ isAuthenticating: false });
      })
  }

  render() {

    return (
      <BrowserRouter >
        <div className="app" id='menu-outer'>
          <Header
            userName={this.state.userData.first_name}
          />
          <div className="menu-wrapper">
            <Switch >
              <Route path="/profile" component={ProfilePage} />
              <Route path="/user/:id" component={ProfilePage} />
              <Route path="/dashboard" render={(routerProps) =>
                <Dashboard
                  isLoggedIn={this.state.isLoggedIn}
                  userData={this.state.userData}
                  {...routerProps} />} />
              <Route path="/post/:id" component={PostDetails} />
              <Route path="/auth-fail" component={AuthFailPage} />
              <Route path="/" exact component={HomePage} />
            </Switch>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
