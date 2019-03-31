const URL_BASE = 'https://swapi.co/api';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

export const apiClient = ({ url, type = 'GET' }) => fetch(`${URL_BASE}/${url}`, {
  method: type,
  headers,
  cache: 'default',
}).then(result => result.json());

export const getFilms = (title) => {
  const url = (title) ? `films?search=${title}` : 'films';
  return apiClient({ url });
};

export const getFilmById = id => apiClient({ url: `films/${id}` });

export const getCharacters = (name) => {
  const url = (name) ? `people?search=${name}` : 'people';
  return apiClient({ url });
};

export const getCharacterById = id => apiClient({ url: `people/${id}` });
