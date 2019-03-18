import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Container from 'react-bootstrap/Container';
import _ from 'lodash';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import CustomList from '../../presentational/CustomList/CustomList.js';
import SearchBar from '../../presentational/SearchBar/SearchBar.js';
import MovieCard from '../../presentational/MovieCard/MovieCard.js';
import CharacterCard from '../../presentational/CharacterCard/CharacterCard.js';

import { fetchMovies, searchMovies } from '../../store/starWarsMovies';
import { fetchCharacters, searchCharacters } from '../../store/starWarsCharacters';

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

  searchData(activeTabKey, query) {
    switch (activeTabKey) {
      case 'movies':
        this.props.searchMovies(query);
        break;
      case 'characters':
        this.props.searchCharacters(query);
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
    const { pathname } = this.props.history.location;
    let { page } = this.state;

    if(action === 'next') {
      page++;
    } else {
      page--;
    }
    this.setState({page});
    this.props.history.push(`${pathname}?page=${page}`);
    this.props.fetchCharacters(page);
  }

  onSearchBarChange(activeTabKey, query) {
    this.setState({page: 1});
    this.searchData(activeTabKey, query);
  }

  renderMovies() {
    const { movies } = this.props;
    return movies ?
        <CustomList
          typeSlug={this.state.activeTabKey}
          cardComponent={MovieCard}
          data={movies}
          onPaginationChange={() => this.onPaginationChange(action)}
        /> :
        <span>No movies to show</span>
  }

  renderCharacters() {
    const { characters } = this.props;
    return characters ?
        <CustomList
          typeSlug={this.state.activeTabKey}
          cardComponent={CharacterCard}
          data={characters}
          onPaginationChange={(action) => this.onPaginationChange(action)}
        /> :
        <span>No characters to show</span>
  }

  renderSearchBar() {
    const { activeTabKey } = this.state;
    return (
      <div className="pt-3">
        <SearchBar handleChange={_.debounce(query => {
          this.onSearchBarChange(activeTabKey, query)
        }, 300)} />
      </div>
    );
  }

  render() {
    const { movies, characters, isFetchingMovies, isFetchingCharacters } = this.props;
    return (
      <Container fluid className="pt-3">
        <Tabs
          id="controlled-tab"
          activeKey={this.state.activeTabKey}
          onSelect={activeTabKey => this.onSelectTab(activeTabKey)}
        >
          <Tab eventKey="movies" title="Movies">
            { this.renderSearchBar() }
            {
              !isFetchingMovies ?
                this.renderMovies() :
                <div className="d-flex justify-content-center pt-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading movies...</span>
                  </div>
                </div>
            }
          </Tab>
          <Tab eventKey="characters" title="Characters">
            { this.renderSearchBar() }
            {
              !isFetchingCharacters ?
                this.renderCharacters() :
                <div className="d-flex justify-content-center pt-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading characters...</span>
                  </div>
                </div>
            }
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: page => dispatch(fetchMovies(page)),
    searchMovies: query => dispatch(searchMovies(query)),

    fetchCharacters: page => dispatch(fetchCharacters(page)),
    searchCharacters: query => dispatch(searchCharacters(query))
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
