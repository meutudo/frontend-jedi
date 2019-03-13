import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import CustomList from '../../presentational/CustomList/CustomList.js';

import { fetchMovies } from '../../store/starWarsMovies';
import { fetchCharacters } from '../../store/starWarsCharacters';

class HomeScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      key: this.props.location.pathname.substring(1),
    };
  }

  componentDidMount() {
    const key = this.state.key;
    switch (key) {
      case 'movies':
        console.log('movies');
        this.props.fetchMovies();
        break;
      case 'characters':
        console.log('characters');
        this.props.fetchCharacters();
        break;
      default:
    }
  }

  onSelectTab(key) {
    if(key === this.state.key) {
      return;
    }

    this.props.history.push(`/${key}`);
    this.setState({key});

    switch (key) {
      case 'movies':
        console.log('movies');
        this.props.fetchMovies();
        break;
      case 'characters':
        console.log('characters');
        this.props.fetchCharacters();
        break;
      default:
    }
  }

  render() {
    const { movies, characters } = this.props;
    console.log('movies', movies);
    console.log('characters', characters);
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={this.state.key}
        onSelect={key => this.onSelectTab(key)}
      >
        <Tab eventKey="movies" title="Movies">
          <CustomList data={movies} />
        </Tab>
        <Tab eventKey="characters" title="Characters">
          <CustomList data={characters} />
        </Tab>
      </Tabs>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: () => dispatch(fetchMovies()),
    fetchCharacters: () => dispatch(fetchCharacters())
  };
}

const mapStateToProps = state => {
  return {
    isFetchingMovies: state.starWarsMovies.isFetchingMovies,
    movies: state.starWarsMovies.movies,

    isFetchingCharacters: state.starWarsCharacters.isFetchingCharacters,
    characters: state.starWarsCharacters.characters
  }
};

const HomeScreenContainer = connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

export default withRouter(HomeScreenContainer);
