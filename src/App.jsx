/* eslint-disable no-unused-vars */
/* eslint-disable sort-imports */
import './styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, {
  useCallback, useEffect, useReducer, useState, lazy, Suspense,
} from 'react';

import apiUtils from './utils/apiUtils';
import useFetchPosts from './utils/useFetchPosts';

const AuthFailPage = lazy(() => import('./pages/AuthFailPage/AuthFailPage'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const EditProfile = lazy(() => import('./components/EditProfile/EditProfile'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const Header = lazy(() => import('./components/Header/Header'));
const HomePage = lazy(() => import('./pages/Homepage/Homepage'));
const PostDetails = lazy(() => import('./pages/PostDetails/PostDetails'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));
const UserPage = lazy(() => import('./pages/UserPage/UserPage'));

const App = () => {
  // Keep track of four things in state:
  // - authentication process state (default: in process of authenticating)
  // - whether user is logged (default: not logged in)
  // - profile data for logged in user (default: profile data is null)
  // - does the user want to editProfile (default: false)
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  const [fetch, toggleFetchPosts] = useReducer((checked) => !checked, true);
  const [offersData, seekingData, isLoading] = useFetchPosts(fetch);

  const getUser = useCallback(() => {
    apiUtils
      .getProfile()
      .then(
        (res) => {
          setAuthenticating(false);
          !isLoggedIn && setLoggedIn(true);
          (res.data.id !== userData.id) && setUserData(res.data);
        },
      )
      .catch(
        (err) => (err.response?.status === 401 ? (
          // Update the state: done authenticating, user is not logged in
          setAuthenticating(false),
          setLoggedIn(false)
        ) : (
          setAuthenticating(false),
          setLoggedIn(false),
          console.log('Error authenticating', err)
        )),
      );
  }, [isLoggedIn, userData.id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  // While the component is authenticating, do not render anything
  // (alternatively, this can be a preloader)
  return (!isAuthenticating && !isLoading) ? (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <div className="app" id="menu-outer">
          <Header userName={userData.first_name} />
          <div className="menu-wrapper" id="menu-wrapper">
            <Routes>
              <Route
                path="/dashboard"
                element={(
                  <Dashboard
                    userData={userData}
                    offersData={offersData}
                    seekingData={seekingData}
                    toggleFetchPosts={toggleFetchPosts}
                  />
                )}
              />
              <Route
                path="/post/:id/*"
                element={(
                  <PostDetails
                    toggleFetchPosts={toggleFetchPosts}
                  />
                )}
              />
              <Route
                path="/profile"
                element={(
                  <ProfilePage
                    userData={userData}
                    getUser={getUser}
                  />
                )}
              >
                <Route
                  path="edit"
                  element={(
                    <EditProfile
                      userData={userData}
                      setUserData={setUserData}
                    />
                  )}
                />
              </Route>
              <Route
                path="/profile/:id"
                element={(<UserPage isLoggedIn={isLoggedIn} />)}
              />
              <Route
                path="/auth-fail"
                element={<AuthFailPage />}
              />
              <Route
                path="/"
                element={(
                  <HomePage
                    isLoggedIn={isLoggedIn}
                  />
                )}
              />
            </Routes>
            <Footer />
          </div>
        </div>
      </Suspense>
    </BrowserRouter>
  ) : (null);
};

export default React.memo(App);
