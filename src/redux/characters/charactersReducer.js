import { Map } from 'immutable';
import * as actions from './charactersActions'

const initialState = new Map({
  characters: [],
  characterSelected: {}
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case actions.FETCH_CHARACTERS:
    const data = {
      characters: payload.results,
      hasNext: payload.next
    }
    return state.merge(data);
  case actions.FETCH_CHARACTER_SELECTED:
    return state.set('characterSelected', payload);
  default:
    return state
  }
}
