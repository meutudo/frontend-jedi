import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFilms } from '../api/client';
import { movies } from '../redux';
import List from '../component/List';

class MovieList extends PureComponent {
  componentDidMount() {
    const { fetchMovies } = this.props;
    getFilms().then(result => {
      fetchMovies(result.results);
    });
  }

  renderRow = (film, index) => (
    <div key={`film_${index}`}>
      <div>{film.title}</div>
      <div>
        <Link to={`film/${index + 1}`} > > </Link>
      </div>
    </div>
  );

  render() {
    const { movies, loadMore } = this.props;
    return (
      <List items={movies} loadMore={loadMore} renderRow={this.renderRow} />
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.get('movies'),
  loadMore: state.characters.get('hasNext')
})

const mapDispatchToProps = {
  fetchMovies: movies.actions.fetchMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
