import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFilms } from '../api/client';
import { movies } from '../redux';

class MovieList extends PureComponent {
  componentDidMount() {
    const { fetchMovies } = this.props;
    getFilms().then(result => {
      fetchMovies(result.results);
    });
  }
  render() {
    const { movies } = this.props;
    return (movies.map((movie, index) => {
      return (
        <div key={`movie_${index}`}>
          <div>{movie.title}</div>
          <div>
            <Link to={`movie/${index+1}`} > > </Link>
          </div>
        </div>
      );
    }));
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.get('movies')
})

const mapDispatchToProps = {
  fetchMovies: movies.actions.fetchMovies
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieList);
