import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import identity from 'lodash/identity';
import { connect } from 'react-redux';
import {
  arrayOf, func, object, string, bool,
} from 'prop-types';
import { getFilms } from '../api/client';
import { movies, requests } from '../redux';
import List from '../component/List';

class MovieList extends PureComponent {
  componentDidMount() {
    const { fetchMovies, requestApi } = this.props;
    requestApi({
      fetch: getFilms,
      callBack: fetchMovies,
    });
  }

  renderRow = (film, index) => (
    <div key={`film_${index}`}>
      <div>{film.title}</div>
      <div>
        <Link to={`movie/${index + 1}`}> details </Link>
      </div>
    </div>
  );

  render() {
    const { movieList, loadMoreUrl, isLoading } = this.props;
    return (
      <List
        items={movieList}
        loadMore={Boolean(loadMoreUrl)}
        renderRow={this.renderRow}
        loadMoreAction={identity}
        isLoading={isLoading}
      />
    );
  }
}

MovieList.propTypes = {
  movieList: arrayOf(object).isRequired,
  loadMoreUrl: string.isRequired,
  isLoading: bool.isRequired,
  fetchMovies: func.isRequired,
  requestApi: func.isRequired,
};

const mapStateToProps = state => ({
  movieList: state.movies.get('movies', [{}]),
  loadMoreUrl: state.characters.get('loadMoreUrl'),
  isLoading: state.ui.get('loading'),
});

const mapDispatchToProps = {
  fetchMovies: movies.actions.fetchMovies,
  requestApi: requests.actions.requestApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
