import fetch from 'isomorphic-fetch';
import { getQueryString } from './misc';

const {
  REACT_APP_API_HOST = '',
  REACT_APP_BASE_URL = '/api/v1',
} = process.env;

export const apiCall = (endpoint, method = 'get', body, query = {}) =>
  fetch(
    `${REACT_APP_API_HOST}${REACT_APP_BASE_URL}/${endpoint}` + getQueryString(query),
    {
      headers: { 'content-type': 'application/json' },
      method,
      body: JSON.stringify(body),
    }
  )
    .then(resp => {
      if (!resp.ok) {
        throw new Error(`${resp.status} ${resp.statusText}`);
      }
      return resp.json().then(json => ({ json, response: resp }));
    })
    .then(({ json, response }) => {
      const headers = Object.assign({}, ...[...response.headers.entries()].map(([k, v]) => ({ [k]: v })));
      return { json, headers };
    });
