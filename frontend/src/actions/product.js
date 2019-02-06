import { APPEND, CLEAR, SET_PAGE } from '../types/product';
import { apiCall } from '../utils';

export const clearProduct = () => ({
  type: CLEAR,
  payload: {},
});

export const setPage = num => ({
  type: SET_PAGE,
  payload: { num: Number(num) },
});

export const appendProducts = products => ({
  type: APPEND,
  payload: { products },
});

export const fetchProducts = (params = {}) =>
  dispatch =>
    apiCall('Product')
      .then(res => {
        dispatch(appendProducts(res))
      });
