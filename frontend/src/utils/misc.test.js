import { getQueryString } from './misc';

describe('getQueryString', () => {
  it('should return empty string for empty params', () => {
    const res = getQueryString();
    expect(res).toBe('');
    const res2 = getQueryString({});
    expect(res2).toBe('');
  });
  it('should return query string starts with "?" for some params', () => {
    const res = getQueryString({ hoge: 4, foo: 'bar' });
    expect(typeof res).toBe('string');
    expect(res[0]).toBe('?');
    const parsed = res.substr(1).split('&');
    expect(parsed).toEqual(['hoge=4', 'foo=bar']);
  });

});
