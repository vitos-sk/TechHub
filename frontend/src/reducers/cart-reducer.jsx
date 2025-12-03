import { ACTION_TYPE } from '../actions'

const initialState = {
  user_id: null,
  items: [],
  added_at: null,
  id: null,
}

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_CART_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
