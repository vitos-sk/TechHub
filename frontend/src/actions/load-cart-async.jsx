import { setCartData } from "./set-cart-data";
import { request } from "../utils/request";

export const loadCartAsync = () => async (dispatch) => {
  try {
    const response = await request("/cart", "GET");

    if (response.error) {
      return { error: response.error };
    }

    dispatch(setCartData(response.data));
    return { error: null, data: response.data };
  } catch (error) {
    return { error: error.message || "Failed to load cart" };
  }
};
