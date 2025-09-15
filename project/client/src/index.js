import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import PlayersPage from './pages/PlayersPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import FlopsPage from './pages/FlopsPage';
import ClubsPage from './pages/ClubsPage';
import NationalTeamsPage from './pages/NationalTeamsPage';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Signup from './pages/Signup';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
	  	<Route exact
							path="/login"
							render={() => (
								<Login/>
							)}/>
		<Route exact
							path="/signup"
							render={() => (
								<Signup />
							)}/>
        <Route exact
							path="/"
							render={() => (
								<HomePage />
							)}/>
        <Route exact
							path="/players"
							render={() => (
								<PlayersPage />
							)}/>
		<Route exact
							path="/clubs"
							render={() => (
								<ClubsPage />
							)}/>
		<Route exact
							path="/flops"
							render={() => (
								<FlopsPage />
							)}/>
		<Route exact
							path="/nationalteams"
							render={() => (
								<NationalTeamsPage />
							)}/>
		<Route exact
							path="/profile"
							render={() => (
								<ProfilePage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

