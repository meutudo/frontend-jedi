import { Map } from 'immutable';
import * as actions from './uiActions'

const initialState = new Map({
  tabSelectedIndex: 0
});

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case actions.TAB_SELECTED_INDEX:
    return state.set('tabSelectedIndex', payload)
  default:
    return state
  }
}
