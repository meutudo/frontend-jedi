import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { ui, movies, characters } from './redux';
import sagas from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    ui: ui.reducer,
    movies: movies.reducer,
    characters: characters.reducer,
  }),
  applyMiddleware(sagaMiddleware),
  // eslint-disable-next-line no-underscore-dangle
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

Object.keys(sagas).map(sagaName => sagaMiddleware.run(sagas[sagaName]));
// sagaMiddleware.run(sagas);

export default store;
