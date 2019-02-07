import {
  APPEND,
  CLEAR,
  SET_ITEM_COUNT,
  INCREASE_ITEM_COUNT,
  SET_TOTAL_ITEM_COUNT,
  SET_PAGE,
} from '../types/product';

const initState = {
  page: 1,
  total: 0,
  itemCount: 0,
  products: [],
}
export default (state = initState, action) => {
  switch(action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload.num };
    case SET_TOTAL_ITEM_COUNT:
      return { ...state, total: action.payload.num };
    case SET_ITEM_COUNT:
      return { ...state, itemCount: action.payload.num };
    case CLEAR:
      return { ...state, products: [] };
    case INCREASE_ITEM_COUNT:
      return { ...state, itemCount: state.itemCount + action.payload.num };
    case APPEND:
      return { ...state, products: state.products.concat(action.payload.products) };
    default :
      return state
  }
}
