import { Map } from 'immutable';
import * as actions from './charactersActions';

const initialState = new Map({
  characters: [],
  characterSelected: {},
  loadMoreUrl: '',
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.FETCH_CHARACTERS: {
      return state.merge({
        characters: payload.results,
        loadMoreUrl: payload.next,
      });
    }
    case actions.APPEND_CHARACTERS: {
      return state.merge({
        characters: state.get('characters').concat(payload.results),
        loadMoreUrl: payload.next,
      });
    }
    case actions.FETCH_CHARACTER_SELECTED:
      return state.set('characterSelected', payload);
    default:
      return state;
  }
};
