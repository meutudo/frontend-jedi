import { Map } from 'immutable';
import * as actions from './uiActions';

const initialState = new Map({
  tabSelectedIndex: 0,
  loading: false,
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.TAB_SELECTED_INDEX:
      return state.set('tabSelectedIndex', payload);
    case actions.TOGGLE_LOADING:
      return state.set('loading', !state.get('loading'));
    default:
      return state;
  }
};
