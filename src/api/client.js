const URL_BASE = 'https://swapi.co/api';
const headers = new Headers().append('Content-Type', 'application/json');
const apiClient = (
  {
    urlBase = URL_BASE,
    urlSufix,
    type = 'GET',
  },
) => fetch(urlSufix ? `${urlBase}/${urlSufix}` : urlBase, {
  method: type,
  headers,
  cache: 'default',
}).then(result => result.json());

export const getFilms = title => apiClient({ urlSufix: (title) ? `films?search=${title}` : 'films' });
export const getFilmById = id => apiClient({ urlSufix: `films/${id}` });
export const getCharacters = name => apiClient({ urlSufix: (name) ? `people?search=${name}` : 'people' });
export const getCharacterById = id => apiClient({ urlSufix: `people/${id}` });
export const getByUrl = urlBase => apiClient({ urlBase });
