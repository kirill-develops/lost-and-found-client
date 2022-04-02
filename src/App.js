/* eslint-disable object-curly-spacing */
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import React from 'react';

import Header from './components/Header/Header';
import HomePage from './pages/Homepage/Homepage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthFailPage from './pages/AuthFailPage/AuthFailPage';
import PostDetails from './pages/PostDetails/PostDetails';
import Footer from './components/Footer/Footer';
// import SignupPage from './pages/SignupPage/SignupPage';
import './styles/App.scss';


function App() {
  return (
    <BrowserRouter >
      <div className="app" id='menu-outer'>
        <Header />
        <div id='menu-wrapper'>
          <Switch >
            {/* <Route path="/signup" component={SignupPage} /> */}
            <Route path="/profile" component={ProfilePage} />
            <Route path="/" exact component={HomePage} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/post/:id" component={PostDetails} />
            <Route path="/auth-fail" component={AuthFailPage} />
          </Switch>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
