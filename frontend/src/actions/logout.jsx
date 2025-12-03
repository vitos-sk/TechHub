import { request } from "../utils/request";
import { ACTION_TYPE } from "./action-type";

export const logout = () => async (dispatch) => {
  try {
    await request("/logout", "POST");
    localStorage.removeItem("userData");
    dispatch({
      type: ACTION_TYPE.LOGOUT,
    });
  } catch (error) {
    console.error("Logout error:", error);
  }
};
