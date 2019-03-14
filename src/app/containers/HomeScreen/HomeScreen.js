import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import CustomList from '../../presentational/CustomList/CustomList.js';
import MovieCard from '../../presentational/MovieCard/MovieCard.js';
import CharacterCard from '../../presentational/CharacterCard/CharacterCard.js';

import { fetchMovies } from '../../store/starWarsMovies';
import { fetchCharacters } from '../../store/starWarsCharacters';

class HomeScreen extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTabKey: this.props.location.pathname.substring(1),
    };
  }

  componentDidMount() {
    const activeTabKey = this.state.activeTabKey;
    switch (activeTabKey) {
      case 'movies':
        this.props.fetchMovies();
        break;
      case 'characters':
        this.props.fetchCharacters();
        break;
      default:
    }
  }

  onSelectTab(activeTabKey) {
    if(activeTabKey === this.state.activeTabKey) {
      return;
    }
    this.props.history.push(`/${activeTabKey}`);
    this.setState({activeTabKey});

    switch (activeTabKey) {
      case 'movies':
        this.props.fetchMovies();
        break;
      case 'characters':
        this.props.fetchCharacters();
        break;
      default:
    }
  }

  render() {
    const { movies, characters } = this.props;
    return (
      <Container fluid className="py-3">
        <Tabs
          id="controlled-tab"
          activeKey={this.state.activeTabKey}
          onSelect={activeTabKey => this.onSelectTab(activeTabKey)}
        >
          <Tab eventKey="movies" title="Movies" className="py-3">
            <CustomList typeSlug={this.state.activeTabKey} cardComponent={MovieCard} data={movies} />
          </Tab>
          <Tab eventKey="characters" title="Characters">
            <CustomList typeSlug={this.state.activeTabKey} cardComponent={CharacterCard} data={characters} />
          </Tab>
        </Tabs>
      </Container>
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
