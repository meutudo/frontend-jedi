export const FETCH_CHARACTERS = 'characters/FETCH_CHARACTERS';
export const APPEND_CHARACTERS = 'characters/APPEND_CHARACTERS';
export const FETCH_CHARACTER_SELECTED = 'characters/FETCH_CHARACTER_SELECTED';

export const fetchCharacters = payload => ({
  type: FETCH_CHARACTERS,
  payload,
});

export const fetchCharacterSelected = payload => ({
  type: FETCH_CHARACTER_SELECTED,
  payload,
});

export const appendCharacters = payload => ({
  type: APPEND_CHARACTERS,
  payload,
});
