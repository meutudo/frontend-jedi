import { combineReducers } from 'redux';

import starWarsMoviesReduce from './starWarsMovies';
import starWarsCharactersReduce from './starWarsCharacters';

export default combineReducers({
  starWarsMovies: starWarsMoviesReduce,
  starWarsCharacters: starWarsCharactersReduce
});
