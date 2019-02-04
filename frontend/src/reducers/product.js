import { APPEND, CLEAR, SET_PAGE } from '../types/product';
const initState = {
  products: [],
}
export default (state = initState, action) => {
  switch(action.type) {
    case SET_PAGE:
      return { ...state, page: action.payload.num };
    case CLEAR:
      return { ...state, products: [] };
    case APPEND:
      return { ...state, products: [...state.products, ...action.payload.products] };
    default :
      return state
  }
}
