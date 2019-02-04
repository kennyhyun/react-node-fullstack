import { SET_ITEMS_PER_PAGE } from '../types/app';
const initState = {
  items: 8,
}
export default (state = initState, action) => {
  switch(action.type) {
    case SET_ITEMS_PER_PAGE:
      return { ...state, items: action.payload.items };
    default :
      return state
  }
}
