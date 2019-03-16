// Action Types
export const Types = {
  FETCH_MOVIES: 'starWarsMovies/FETCH_MOVIES',
  FETCH_MOVIES_COMPLETED: 'starWarsMovies/FETCH_MOVIES_COMPLETED',
  FETCH_MOVIES_ERROR: 'starWarsMovies/FETCH_MOVIES_ERROR'
};

// Action Creators
export function fetchMovies(page) {
  console.log('Fetch Movies ACTION CREATOR', page);
  return function(dispatch) {
    dispatch({ type: Types.FETCH_MOVIES });
    return fetch(`https://swapi.co/api/films?page=${page}`)
      .then(response => response.json())
      .then(json => {
        console.log('Fetch Movies: then... dispatch...', json);
        dispatch({ type: Types.FETCH_MOVIES_COMPLETED, payload: json, isFetchingMovies: false });
      })
      .catch(error => {
        dispatch({ type: Types.FETCH_MOVIES_ERROR, error, isFetchingMovies: false });
      });
  }
}

// Inital state
const initialState = {
  movies: []
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_MOVIES:
      console.log('Types.FETCH_MOVIES REDUCER', action.payload);
      return { isFetchingMovies: true };
    case Types.FETCH_MOVIES_COMPLETED:
      console.log('Types.FETCH_MOVIES_COMPLETED REDUCER', action.payload);
      return { movies: action.payload, isFetchingMovies: false };
    default:
      return state;
  }
}
