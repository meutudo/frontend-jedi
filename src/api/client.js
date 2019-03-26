const URL_BASE = 'https://swapi.co/api';

var headers = new Headers();
headers.append("Content-Type", "application/json");

export const apiClient = ({ url, type = 'GET' }) => {
  return fetch(`${URL_BASE}/${url}`, { method: type,
  headers,
  cache: 'default' }).then(result => result.json());
};

export const getFilms = () => {
  return apiClient({ url: 'films' })
}

export const getFilmById = (id) => {
  return apiClient({ url: `films/${id}` })
}

export const getCharacters = () => {
  return apiClient({ url: 'people' })
}

export const getCharacterById = (id) => {
  return apiClient({ url: `people/${id}` })
}
