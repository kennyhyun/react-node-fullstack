import fetch from 'isomorphic-fetch';

const {
  REACT_APP_API_HOST = '',
  REACT_APP_BASE_URL = '/api/v1',
} = process.env;

export const apiCall = (endpoint, method = 'get', body) =>
  fetch(`${REACT_APP_API_HOST}${REACT_APP_BASE_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
    .then(resp => resp.json().then(json => ({ json, response: resp })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    });
