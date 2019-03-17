// Action Types
export const Types = {
  FETCH_MOVIES: 'starWarsMovies/FETCH_MOVIES',
  FETCH_MOVIES_COMPLETED: 'starWarsMovies/FETCH_MOVIES_COMPLETED',
  FETCH_MOVIES_ERROR: 'starWarsMovies/FETCH_MOVIES_ERROR',

  SEARCH_MOVIES: 'starWarsMovies/SEARCH_MOVIES',
  SEARCH_MOVIES_COMPLETED: 'starWarsMovies/SEARCH_MOVIES_COMPLETED',
  SEARCH_MOVIES_ERROR: 'starWarsMovies/SEARCH_MOVIES_ERROR'
};

// Action Creators
export function fetchMovies(page) {
  return function(dispatch) {
    dispatch({ type: Types.FETCH_MOVIES });
    return fetch(`https://swapi.co/api/films?page=${page}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: Types.FETCH_MOVIES_COMPLETED, payload: json, isFetchingMovies: false });
      })
      .catch(error => {
        dispatch({ type: Types.FETCH_MOVIES_ERROR, error, isFetchingMovies: false });
      });
  }
}

export function searchMovies(query) {
  return function(dispatch) {
    dispatch({ type: Types.SEARCH_MOVIES });
    return fetch(`https://swapi.co/api/films/?search=${query}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: Types.SEARCH_MOVIES_COMPLETED, payload: json, isFetchingMovies: false });
      })
      .catch(error => {
        dispatch({ type: Types.SEARCH_MOVIES_ERROR, error, isFetchingMovies: false });
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
      return { isFetchingMovies: true };
    case Types.FETCH_MOVIES_COMPLETED:
      return { movies: action.payload, isFetchingMovies: false };
    case Types.SEARCH_MOVIES:
      return { isFetchingMovies: true };
    case Types.SEARCH_MOVIES_COMPLETED:
      return { movies: action.payload, isFetchingMovies: false };
    default:
      return state;
  }
}
