import { createStore, combineReducers } from 'redux';
import { ui, movies, characters } from './redux';

const store = createStore(combineReducers({
  ui: ui.reducer,
  movies: movies.reducer,
  characters: characters.reducer,
// eslint-disable-next-line no-underscore-dangle
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
