/* eslint-disable object-curly-spacing */
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

  const [isAuthenticating, setAuthenticating] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    apiUtils
      .getProfile()
      .then(res => {
        setLoggedIn(true);
        setUserData(res.data);
      })
      .catch(_err => {
        setAuthenticating(false);
      })
  }, [isLoggedIn]);

  return (
    <BrowserRouter >
      <div className="app" id='menu-outer'>
        <Header
          userName={userData.first_name}
        />
        <div className="menu-wrapper" id='menu-wrapper'>
          <Switch >
            <Route path="/profile" component={ProfilePage} />
            <Route path="/user/:id" component={ProfilePage} />
            <Route path="/dashboard" render={(routerProps) =>
              <Dashboard
                isLoggedIn={isLoggedIn}
                userData={userData}
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

export default App;
