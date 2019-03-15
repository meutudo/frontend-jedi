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

    const page = new URLSearchParams(this.props.history.location.search)
      .get('page') || 1;

    this.state = {
      activeTabKey: this.props.location.pathname.substring(1),
      page
    };
  }

  componentDidMount() {
    const activeTabKey = this.state.activeTabKey;
    const page = this.state.page || 1;
    this.fetchData(activeTabKey, page);
  }

  fetchData(activeTabKey, page) {
    switch (activeTabKey) {
      case 'movies':
        this.props.fetchMovies(page);
        break;
      case 'characters':
        this.props.fetchCharacters(page);
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

    const page = 1;
    this.fetchData(activeTabKey, page);
  }

  onPaginationChange(action) {
    console.log('onPaginationChange');
    const { pathname } = this.props.history.location;
    let { page } = this.state;

    console.log(page);
    console.log(action);

    if(action === 'next') {
      page++;
    } else {
      page--;
    }
    this.setState({page});
    this.props.history.push(`${pathname}?page=${page}`);
    this.props.fetchCharacters(page);
  }

  render() {
    const { movies, characters } = this.props;
    return (
      <Container fluid className="pt-3">
        <Tabs
          id="controlled-tab"
          activeKey={this.state.activeTabKey}
          onSelect={activeTabKey => this.onSelectTab(activeTabKey)}
        >
          <Tab eventKey="movies" title="Movies">
            <CustomList
              typeSlug={this.state.activeTabKey}
              cardComponent={MovieCard}
              data={movies}
              onPaginationChange={() => this.onPaginationChange()} />
          </Tab>
          <Tab eventKey="characters" title="Characters">
            <CustomList
              typeSlug={this.state.activeTabKey}
              cardComponent={CharacterCard}
              data={characters}
              onPaginationChange={(action) => this.onPaginationChange(action)} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: page => dispatch(fetchMovies(page)),
    fetchCharacters: page => dispatch(fetchCharacters(page))
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
