import {
  APPEND,
  CLEAR,
  SET_ITEM_COUNT,
  INCREASE_ITEM_COUNT,
  SET_TOTAL_ITEM_COUNT,
  SET_PAGE,
} from '../types/product';
import { apiCall } from '../utils';

export const clearProduct = () => ({
  type: CLEAR,
  payload: {},
});

export const setPage = num => ({
  type: SET_PAGE,
  payload: { num: Number(num) },
});

export const setTotalItemCount = num => ({
  type: SET_TOTAL_ITEM_COUNT,
  payload: { num: Number(num) },
});

export const increaseItemCount = num => ({
  type: INCREASE_ITEM_COUNT,
  payload: { num: Number(num) },
});

export const setItemCount = num => ({
  type: SET_ITEM_COUNT,
  payload: { num: Number(num) },
});

export const appendProducts = products => ({
  type: APPEND,
  payload: { products },
});

const defaultParam = {
  sort: '-_id',
  limit: 100,
};

export const fetchProducts = (params) =>
  dispatch =>
    apiCall('Product', 'get', undefined, { ...defaultParam, ...params })
      .then(({ json: res, headers }) => {
        const { 'x-total-count': count } = headers;
        dispatch(increaseItemCount(res.length));
        dispatch(appendProducts(res));
        dispatch(setTotalItemCount(count));
      })
      .catch(e => console.error(e))
;
