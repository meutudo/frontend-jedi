import { hot } from 'react-hot-loader/root';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import StarWarsMovies from './containers/StarWarsMovies/StarWarsMovies.js';
import StarWarsCharacters from './containers/StarWarsCharacters/StarWarsCharacters.js';

import store from './store';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/movies" />
        <Route exact path="/movies" component={StarWarsMovies} />
        <Route exact path="/characters" component={StarWarsCharacters} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default hot(App);
