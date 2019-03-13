import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../../store/starWarsMovies';
import TabList from '../../presentational/TabList/TabList.js';
import Header from '../../presentational/Header/Header.js';

class StarWarsMovies extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.starWarsMovies);
  return {
    isFetching: state.starWarsMovies.isFetching,
    movies: state.starWarsMovies.movies
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: () => dispatch(fetchMovies())
  };
}

const Container = connect(mapStateToProps, mapDispatchToProps)(StarWarsMovies);

export default Container;
