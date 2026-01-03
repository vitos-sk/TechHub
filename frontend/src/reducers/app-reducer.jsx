import { ACTION_TYPE } from "../actions/action-type";

const initialState = {
  isLogout: false,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.LOGOUT:
      return {
        ...state,
        isLogout: true,
      };
    default:
      return state;
  }
};
