import { ACTION_TYPE } from '../actions/action-type'
const inititalState = {
  isLogout: false,
}

export const appReducer = (state = inititalState, action) => {
  switch (action.type) {
    case '':
      return {}
    default:
      return state
  }
}
