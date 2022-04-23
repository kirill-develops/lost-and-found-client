/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
import './styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import AuthFailPage from './pages/AuthFailPage/AuthFailPage';
import apiUtils from './utils/apiUtils';
import Dashboard from './pages/Dashboard/Dashboard';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HomePage from './pages/Homepage/Homepage';
import PostDetails from './pages/PostDetails/PostDetails';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const App = () => {
  // Keep track of four things in state:
  // - authentication process state (default: in process of authenticating)
  // - whether user is logged (default: not logged in)
  // - profile data for logged in user (default: profile data is null)
  // - does the user want to editProfile (default: false)
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const handleErr = (err) => (err.response.status === 401
    ? (
      // Update the state: done authenticating, user is not logged in
      setAuthenticating(false),
      setLoggedIn(false)
    ) : (
      console.log('Error authenticating', err),
      setAuthenticating(false),
      setLoggedIn(false)
    ));

  useEffect(() => {
    apiUtils
      .getProfile()
      .then((res) => {
        setAuthenticating(false);
        !isLoggedIn && setLoggedIn(true);
        (res.data.id !== userData.id) && (setUserData(res.data));
      })
      .catch((err) => {
        // If we are getting back 401 (Unauthorized) back from the server, means
        // we need to log in
        handleErr(err);
      });
  }, [isLoggedIn, userData]);

  // While the component is authenticating, do not render anything
  // (alternatively, this can be a preloader)
  return isAuthenticating ? (
    null
  ) : (
    <BrowserRouter>
      <div className="app" id="menu-outer">
        <Header
          userName={userData.first_name}
        />
        <div className="menu-wrapper" id="menu-wrapper">
          <Routes>
            <Route
              path="/dashboard"
              element={(
                <Dashboard
                  userData={userData}
                />
              )}
            />
            <Route
              path="/post/:id"
              element={<PostDetails />}
            />
            <Route
              path="/profile"
              element={<ProfilePage userData={userData} />}
            />
            <Route
              path="/profile/:id"
              element={<ProfilePage />}
            />
            <Route
              path="/auth-fail"
              element={<AuthFailPage />}
            />
            <Route
              path="/"
              element={<HomePage isLoggedIn={isLoggedIn} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default React.memo(App);
