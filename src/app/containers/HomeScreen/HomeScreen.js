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

  renderMovies() {
    const { movies } = this.props;
    return movies ?
      <CustomList
        typeSlug={this.state.activeTabKey}
        cardComponent={MovieCard}
        data={movies}
        onPaginationChange={() => this.onPaginationChange()}
      /> :
      <div>No movies to show...</div>
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
      <div></div>
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
