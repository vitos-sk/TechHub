import { ROLE } from "../bff/constans/role";
import { ACTION_TYPE } from "../actions/action-type";

const initialState = {
  id: null,
  email: null,
  role_id: ROLE.GUEST,
  session: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_USER:
      return {
        ...state,
        ...action.payload,
      };
    case ACTION_TYPE.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
