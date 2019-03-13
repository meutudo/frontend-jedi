// Action Types
export const Types = {
  FETCH_MOVIES: 'starWarsMovies/FETCH_MOVIES',
  FETCH_MOVIES_COMPLETED: 'starWarsMovies/FETCH_MOVIES_COMPLETED',
  FETCH_MOVIES_ERROR: 'starWarsMovies/FETCH_MOVIES_ERROR'
};

// Action Creators
export function fetchMovies() {
  console.log('Fetch Movies ACTION CREATOR');
  return function(dispatch) {
    return fetch('https://swapi.co/api/people/') // https://jsonplaceholder.typicode.com/todos/
      .then(response => response.json())
      .then(json => {
        console.log('Fetch Movies: then... dispatch...', json);
        dispatch({ type: Types.FETCH_MOVIES_COMPLETED, payload: json, isFetching: false });
      })
      .catch(error => {
        dispatch({ type: Types.FETCH_MOVIES_ERROR, error, isFetching: false });
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
      return { isFetching: true };
    case Types.FETCH_MOVIES_COMPLETED:
      console.log('Types.FETCH_MOVIES_COMPLETED REDUCER', action.payload);
      return { movies: action.payload, isFetching: false };
    default:
      return state;
  }
}
