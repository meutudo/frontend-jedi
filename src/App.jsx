import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { pure } from 'recompose';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import CharacterDetail from './pages/CharacterDetail';

const App = () => (
  <div className="App">
    <header className="App-header">
      Frontend Jedi
    </header>
    <section>
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/movie/:id" exact component={MovieDetail} />
        <Route path="/character/:id" exact component={CharacterDetail} />
      </BrowserRouter>
    </section>
  </div>
);

export default pure(App);
