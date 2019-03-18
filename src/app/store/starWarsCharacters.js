// Action Types
export const Types = {
  FETCH_CHARACTERS: 'starWarsCharacters/FETCH_CHARACTERS',
  FETCH_CHARACTERS_COMPLETED: 'starWarsCharacters/FETCH_CHARACTERS_COMPLETED',
  FETCH_CHARACTERS_ERROR: 'starWarsCharacters/FETCH_CHARACTERS_ERROR',

  FETCH_CHARACTER: 'starWarsMovies/FETCH_CHARACTER',
  FETCH_CHARACTER_COMPLETED: 'starWarsMovies/FETCH_CHARACTER_COMPLETED',
  FETCH_CHARACTER_ERROR: 'starWarsMovies/FETCH_CHARACTER_ERROR',

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

export function fetchCharacter(id) {

  console.log('fetchCharacter');

  return function(dispatch) {
    dispatch({ type: Types.FETCH_CHARACTER });
    return fetch(`https://swapi.co/api/people/${id}`)
      .then(response => response.json())
      .then(json => {
        dispatch({ type: Types.FETCH_CHARACTER_COMPLETED, payload: json, isFetchingCharacter: false });
      })
      .catch(error => {
        dispatch({ type: Types.FETCH_CHARACTER_ERROR, error, isFetchingCharacter: false });
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

    case Types.FETCH_CHARACTER:
      return { isFetchingCharacter: true };
    case Types.FETCH_CHARACTER_COMPLETED:
      console.log('action.payload', action.payload);
      return { character: action.payload, isFetchingCharacter: false };

    case Types.SEARCH_CHARACTERS:
      return { isFetchingCharacters: true };
    case Types.SEARCH_CHARACTERS_COMPLETED:
      return { characters: action.payload, isFetchingCharacters: false };

    default:
      return state;
  }
}
