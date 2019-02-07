import { apiCall } from './apiCall';
import fetch from 'isomorphic-fetch';

jest.mock('isomorphic-fetch', () => jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({}),
  headers: new Map(),
}));

describe('apiCall', () => {
  it('should call fetch with default endpoint', async () => {
    await apiCall('product');
    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/product',
      { headers: { 'content-type': 'application/json' }, method: 'get' }
    );
  });
  it('should return an object with json and headers', async () => {
    const resp = await apiCall('product');
    expect(resp).toEqual({ json: {}, headers: {} });
  });

});

describe('apiCall with process.env', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetModules();
    jest.mock('isomorphic-fetch', () => jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(),
      headers: new Map(),
    }));
    process.env = { ...OLD_ENV };
    process.env.REACT_APP_API_HOST = 'http://dummy';
  });
  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('should call fetch with REACT_APP_API_HOST endpoint', async () => {
    const { apiCall } = require('./apiCall');
    const fetch = (await import('isomorphic-fetch')).default;

    await apiCall('product');
    expect(fetch).toHaveBeenCalledWith(
      'http://dummy/api/v1/product',
      { headers: { 'content-type': 'application/json' }, method: 'get' }
    );
  });

});
