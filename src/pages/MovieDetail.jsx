import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import { format } from 'date-fns';
import { Typography } from '@material-ui/core';
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
      <section className="detail movie-detail">
        <Typography variant="h5" component="h3">
          {movie.title}
        </Typography>
        <Typography component="p">
          {movie.opening_crawl}
        </Typography>
        <Typography component="p">
          {`Diretor: ${movie.director}`}
        </Typography>
        <Typography component="p">
          {`Produtor(es): ${movie.producer}`}
        </Typography>
        <Typography component="p">
          {`Lançado em: ${format(movie.release_date, 'DD/MM/YYYY')}`}
        </Typography>
      </section>
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
