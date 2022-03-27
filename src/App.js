import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/Homepage/Homepage';
import SignupPage from './pages/SignupPage/SignupPage';
import ProfilePage from './pages/ProfilePage/ProfilePage'
import Dashboard from './pages/Dashboard/Dashboard';
import './styles/App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/signup" component={SignupPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/" exact component={HomePage} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;