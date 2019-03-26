import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail';
import CharacterDetail from './pages/CharacterDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Frontend Jedi
        </header>
        <section>
          <BrowserRouter>
            <Route path="/" exact component={Home}/>
            <Route path="/movie/:id" exact component={MovieDetail}/>
            <Route path="/character/:id" exact component={CharacterDetail} />
          </BrowserRouter>
        </section>
      </div>
    );
  }
}

export default App;
