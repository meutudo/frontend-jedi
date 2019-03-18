import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchMovie } from '../../store/starWarsMovies';

import MovieDetail from '../../presentational/MovieDetail/MovieDetail.js';

class MovieDetailsScreen extends Component {
  state = {

  }

  componentDidMount() {
    const { fetchMovie } = this.props;
    const id = this.props.match.params.id;
    fetchMovie(id);
  }

  render() {
    const { movie, isFetchingMovie } = this.props;
    return (
      movie ?
        <MovieDetail data={movie} /> :
        <div className="d-flex justify-content-center pt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading movies...</span>
          </div>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMovie: id => dispatch(fetchMovie(id))
  };
}

const mapStateToProps = state => {
  return {
    isFetchingMovie: state.starWarsMovies.isFetchingMovie,
    movie: state.starWarsMovies.movie
  }
};

const MovieDetailsScreenContainer = connect(mapStateToProps, mapDispatchToProps)(MovieDetailsScreen);

export default withRouter(MovieDetailsScreenContainer);
