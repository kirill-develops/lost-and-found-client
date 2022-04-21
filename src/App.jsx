import { BrowserRouter, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiUtils from './utils/apiUtils';

import Header from './components/Header/Header';
import HomePage from './pages/Homepage/Homepage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthFailPage from './pages/AuthFailPage/AuthFailPage';
import PostDetails from './pages/PostDetails/PostDetails';
import Footer from './components/Footer/Footer';
import './styles/App.scss';

const App = () => {
  // Keep track of four things in state:
  // - authentication process state (default: in process of authenticating)
  // - whether user is logged (default: not logged in)
  // - profile data for logged in user (default: profile data is null)
  // - does the user want to editProfile (default: false)
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    apiUtils
      .getProfile()
      .then((res) => {
        setAuthenticating(false);
        setLoggedIn(true);
        res.data !== userData && setUserData(res.data);
      })
      .catch((err) => {
        // If we are getting back 401 (Unauthorized) back from the server, means
        // we need to log in
        err.response.status === 401 ? (
          // Update the state: done authenticating, user is not logged in
          setAuthenticating(false),
          setLoggedIn(false)
        ) : (
          console.log('Error authenticating', err),
          setAuthenticating(false),
          setLoggedIn(false)
        );
      });
  }, [isLoggedIn]);

  // While the component is authenticating, do not render anything
  // (alternatively, this can be a preloader)
  return isAuthenticating ? (
    null
  ) : (
    <BrowserRouter>
      {console.log(userData)}
      <div className="app" id="menu-outer">
        <Header
          userName={userData.first_name}
        />
        <div className="menu-wrapper" id="menu-wrapper">
          <Switch>
            <Route
              path="/profile"
              render={() => (
                <ProfilePage
                  userData={userData}
                />
              )}
            />
            <Route
              path="/user/:id"
              component={ProfilePage}
            />
            <Route
              path="/dashboard"
              render={(routerProps) => (
                <Dashboard
                  isLoggedIn={isLoggedIn}
                  userData={userData}
                  routerProps={routerProps}
                />
              )}
            />
            <Route
              path="/post/:id"
              component={PostDetails}
            />
            <Route
              path="/auth-fail"
              component={AuthFailPage}
            />
            <Route
              path="/"
              exact
              component={HomePage}
            />
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
