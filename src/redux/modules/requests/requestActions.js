export const FETCH_REQUESTED = 'fetch/REQUESTED';

export const requestApi = payload => ({
  type: FETCH_REQUESTED,
  payload,
});
