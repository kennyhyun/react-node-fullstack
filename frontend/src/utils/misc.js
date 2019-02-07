import 'url-search-params-polyfill';

export const getQueryString = (param = {}) => {
  const sp = new URLSearchParams();
  const entries = Object.entries(param);
  entries.forEach(([k, v]) => {
    sp.set(k, v);
  });
  if (!entries.length) {
    return '';
  }
  return `?${sp.toString()}`;
};

