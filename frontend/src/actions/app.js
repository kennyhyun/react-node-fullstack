import { SET_ITEMS_PER_PAGE } from '../types/app';

export const setItemsPerPage = num => ({
  type: SET_ITEMS_PER_PAGE,
  payload: { items: Number(num) },
});

