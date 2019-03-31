import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import { getFilmById } from '../api/client';
import { movies, requests } from '../redux';

class MovieDetail extends PureComponent {
  componentDidMount() {
    const { match: { params: { id } }, fetchMovie, requestApi } = this.props;
    requestApi({
      fetch: getFilmById,
      args: id,
      callBack: fetchMovie,
    });
  }

  render() {
    const { movie } = this.props;
    return (
      <Fragment>
        <div>{movie.title}</div>
        <div>{movie.opening_crawl}</div>
      </Fragment>
    );
  }
}

MovieDetail.propTypes = {
  movie: shape.isRequired,
  fetchMovie: func.isRequired,
  match: shape.isRequired,
  requestApi: func.isRequired,
};

const mapStateToProps = state => ({
  movie: state.movies.get('movieSelected'),
});

const mapDispatchToProps = {
  fetchMovie: movies.actions.fetchMovieSelected,
  requestApi: requests.actions.requestApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetail);
