import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import identity from 'lodash/identity';
import { connect } from 'react-redux';
import {
  ListItem, ListItemIcon, Divider, ListItemText,
} from '@material-ui/core';
import ArrowRight from '@material-ui/icons/ArrowRight';
import {
  arrayOf, func, object, string, bool,
} from 'prop-types';
import { getFilms } from '../api/client';
import { movies, requests } from '../redux';
import CustomList from '../component/CustomList';

class MovieList extends PureComponent {
  componentDidMount() {
    const { fetchMovies, requestApi } = this.props;
    requestApi({
      fetch: getFilms,
      callBack: fetchMovies,
    });
  }

  renderRow = (film, index) => (
    <Link to={`movie/${index + 1}`}>
      <ListItem button key={`film_${index}`}>
        <ListItemText primary={film.title} />
        <ListItemIcon>
          <ArrowRight />
        </ListItemIcon>
        <Divider />
      </ListItem>
    </Link>
  );

  render() {
    const { movieList, loadMoreUrl, isLoading } = this.props;
    return (
      <Fragment>
        <CustomList
          items={movieList}
          loadMore={!isLoading && Boolean(loadMoreUrl)}
          renderRow={this.renderRow}
          loadMoreAction={identity}
        />
      </Fragment>
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
  loadMoreUrl: state.movies.get('loadMoreUrl'),
  isLoading: state.ui.get('loading'),
});

const mapDispatchToProps = {
  fetchMovies: movies.actions.fetchMovies,
  requestApi: requests.actions.requestApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
