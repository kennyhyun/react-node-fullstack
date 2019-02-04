import { APPEND, CLEAR, SET_PAGE } from '../types/product';

export const clearProduct = () => ({
  type: CLEAR,
  payload: {},
});

export const setPage = num => ({
  type: SET_PAGE,
  payload: { num },
});

export const appendProduct = products => ({
  type: APPEND,
  payload: { products },
});

export const fetchProducts = ({}) =>
  dispatch =>
    callApi('products')
      .then(res => {
        dispatch(appendProducts(res))
      }
