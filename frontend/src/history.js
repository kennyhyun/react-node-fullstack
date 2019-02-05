import 'url-search-params-polyfill';
export const getParam = (search) => {
  const sp = new URLSearchParams(search);
  return Object.assign({}, ...[...sp.entries()].map(([k, v]) => ({[k]: v})));
};

