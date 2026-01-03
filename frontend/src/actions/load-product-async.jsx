import { setProductData } from "./set-product-data";
import { request } from "../utils/request";

export const loadProductAsync = (productId) => async (dispatch) => {
  try {
    const response = await request(`/products/${productId}`);

    if (response.error) {
      return { error: response.error };
    }

    if (response.data) {
      dispatch(setProductData(response.data));
      return { error: null, data: response.data };
    }

    return { error: "Product data not found" };
  } catch (error) {
    return { error: error.message || "Failed to load product" };
  }
};
