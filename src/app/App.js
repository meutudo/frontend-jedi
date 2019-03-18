import { hot } from 'react-hot-loader/root';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import Home from './containers/HomeScreen/HomeScreen.js';
import MovieDetails from './containers/MovieDetailsScreen/MovieDetailsScreen.js';
import CharacterDetails from './containers/CharacterDetailsScreen/CharacterDetailsScreen.js';

import store from './store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/movies" />

        <Route exact path="/movies" component={Home} />
        <Route exact path="/movies" component={Home} />
        <Route exact path="/movies/:id" component={MovieDetails} />

        <Route exact path="/characters" component={Home} />
        <Route exact path="/characters" component={Home} />
        <Route exact path="/characters/:id" component={CharacterDetails} />

      </Switch>
    </BrowserRouter>
  </Provider>
);

export default hot(App);
