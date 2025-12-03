import { setProductData } from "./set-product-data";
import { request } from "../utils/request";

export const loadProductAsync = (productId) => async (dispatch) =>
  request(`/products/${productId}`).then((res) => {
    if (res) {
      dispatch(setProductData(res.data));
      return res.data;
    }
    return res.data;
  });
