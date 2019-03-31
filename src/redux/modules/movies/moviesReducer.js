import { Map } from 'immutable';
import * as actions from './moviesActions';

const initialState = new Map({
  movies: [],
  movieSelected: {},
  loadMoreUrl: '',
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_MOVIES:
      return state.merge({
        movies: payload,
        loadMoreUrl: payload.next,
      });
    case actions.FETCH_MOVIE_SELECTED:
      return state.set('movieSelected', payload);
    default:
      return state;
  }
};
