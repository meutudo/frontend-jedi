import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  arrayOf, bool, func, object,
} from 'prop-types';
import { getFilms } from '../api/client';
import { movies } from '../redux';
import List from '../component/List';

class MovieList extends PureComponent {
  componentDidMount() {
    const { fetchMovies } = this.props;
    getFilms().then((result) => {
      fetchMovies(result.results);
    });
  }

  renderRow = (film, index) => (
    <div key={`film_${index}`}>
      <div>{film.title}</div>
      <div>
        <Link to={`film/${index + 1}`}> details </Link>
      </div>
    </div>
  );

  render() {
    const { movieList, loadMore } = this.props;
    return (
      <List items={movieList} loadMore={loadMore} renderRow={this.renderRow} />
    );
  }
}

MovieList.propTypes = {
  movieList: arrayOf(object).isRequired,
  loadMore: bool.isRequired,
  fetchMovies: func.isRequired,
};

const mapStateToProps = state => ({
  movieList: state.movies.get('movies'),
  loadMore: state.characters.get('hasNext'),
});

const mapDispatchToProps = {
  fetchMovies: movies.actions.fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
