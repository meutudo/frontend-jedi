export const FETCH_MOVIES = 'movies/FETCH_MOVIES';
export const FETCH_MOVIE_SELECTED = 'movies/FETCH_MOVIE_SELECTED';

export const fetchMovies = (payload) => ({
  type: FETCH_MOVIES,
  payload
});

export const fetchMovieSelected = (payload) => ({
  type: FETCH_MOVIE_SELECTED,
  payload
});


