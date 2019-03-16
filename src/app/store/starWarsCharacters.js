// Action Types
export const Types = {
  FETCH_CHARACTERS: 'starWarsCharacters/FETCH_CHARACTERS',
  FETCH_CHARACTERS_COMPLETED: 'starWarsCharacters/FETCH_CHARACTERS_COMPLETED',
  FETCH_CHARACTERS_ERROR: 'starWarsCharacters/FETCH_CHARACTERS_ERROR'
};

// Action Creators
export function fetchCharacters(page) {
  console.log('Fetch Characters ACTION CREATOR');
  return function(dispatch) {
    dispatch({ type: Types.FETCH_CHARACTERS });
    return fetch(`https://swapi.co/api/people?page=${page}`)
      .then(response => response.json())
      .then(json => {
        console.log('Fetch Characters: then... dispatch...', json);
        dispatch({ type: Types.FETCH_CHARACTERS_COMPLETED, payload: json, isFetchingCharacters: false });
      })
      .catch(error => {
        dispatch({ type: Types.FETCH_CHARACTERS_ERROR, error, isFetchingCharacters: false });
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
      console.log('Types.FETCH_CHARACTERS REDUCER', action.payload);
      return { isFetchingCharacters: true };
    case Types.FETCH_CHARACTERS_COMPLETED:
      console.log('Types.FETCH_CHARACTERS_COMPLETED REDUCER', action.payload);
      return { characters: action.payload, isFetchingCharacters: false };
    default:
      return state;
  }
}
