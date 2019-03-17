// Action Types
export const Types = {
  FETCH_CHARACTERS: 'starWarsCharacters/FETCH_CHARACTERS',
  FETCH_CHARACTERS_COMPLETED: 'starWarsCharacters/FETCH_CHARACTERS_COMPLETED',
  FETCH_CHARACTERS_ERROR: 'starWarsCharacters/FETCH_CHARACTERS_ERROR',

  SEARCH_CHARACTERS: 'starWarsMovies/SEARCH_CHARACTERS',
  SEARCH_CHARACTERS_COMPLETED: 'starWarsMovies/SEARCH_CHARACTERS_COMPLETED',
  SEARCH_CHARACTERS_ERROR: 'starWarsMovies/SEARCH_MOVIES_ERROR'
};

// Action Creators
export function fetchCharacters(page) {
  return function(dispatch) {
    dispatch({ type: Types.FETCH_CHARACTERS });
    return fetch(`https://swapi.co/api/people?page=${page}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: Types.FETCH_CHARACTERS_COMPLETED, payload: json, isFetchingCharacters: false });
      })
      .catch(error => {
        dispatch({ type: Types.FETCH_CHARACTERS_ERROR, error, isFetchingCharacters: false });
      });
  }
}

export function searchCharacters(query) {
  console.log('searchCharacters');
  return function(dispatch) {
    dispatch({ type: Types.SEARCH_CHARACTERS });
    return fetch(`https://swapi.co/api/people?search=${query}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: Types.SEARCH_CHARACTERS_COMPLETED, payload: json, isFetchingCharacters: false });
      })
      .catch(error => {
        dispatch({ type: Types.SEARCH_CHARACTERS_ERROR, error, isFetchingCharacters: false });
      });
  }
}

// Inital state
const initialState = {
  characters: []
};

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.FETCH_CHARACTERS:
      return { isFetchingCharacters: true };
    case Types.FETCH_CHARACTERS_COMPLETED:
      return { characters: action.payload, isFetchingCharacters: false };
    case Types.SEARCH_CHARACTERS:
      return { isFetchingCharacters: true };
    case Types.SEARCH_CHARACTERS_COMPLETED:
      return { characters: action.payload, isFetchingCharacters: false };

    default:
      return state;
  }
}
