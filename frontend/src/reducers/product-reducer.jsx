import { ACTION_TYPE } from '../actions'

const initialState = {
  id: '',
  name: '',
  price: '',
  description: '',
  image_url: '',
  publishet_at: '',
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT_DATA:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
