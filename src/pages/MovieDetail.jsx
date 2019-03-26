import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { getFilmById } from '../api/client';
import { movies } from '../redux';

class MovieDetail extends PureComponent {
  componentDidMount() {
    const { match: { params: { id } }, fetchMovie } = this.props;
    getFilmById(id).then((result) => {
      fetchMovie(result);
    });
  }
  
  render() {
    const { movie } = this.props;
    return (
      <Fragment>
        <div>{movie.title}</div>
        <div>{movie.opening_crawl}</div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  movie: state.movies.get('movieSelected')
});

const mapDispatchToProps = {
  fetchMovie: movies.actions.fetchMovieSelected
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
