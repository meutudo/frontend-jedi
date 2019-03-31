import { Map } from 'immutable';
import * as actions from './moviesActions';

const initialState = new Map({
  movies: [],
  movieSelected: {},
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_MOVIES:
      return state.set('movies', payload);
    case actions.FETCH_MOVIE_SELECTED:
      return state.set('movieSelected', payload);
    default:
      return state;
  }
};
