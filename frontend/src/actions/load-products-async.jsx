import { setProductsData } from "./set-products-data";
import { setCategoriesData } from "./set-categories-data";
import { request } from "../utils/request";

export const loadProductsAsync =
  (page = 1, limit = 9, search = "", category = "all") =>
  async (dispatch) => {
    try {
      const url = `/products?page=${page}&limit=${limit}&search=${search}&category=${category}`;
      const response = await request(url);

      if (response.error) {
        return { error: response.error };
      }

      const { products, lastPage, categories, totalCount } = response.data;

      dispatch(
        setProductsData({
          products,
          page,
          totalPages: lastPage,
          totalCount,
        })
      );

      dispatch(setCategoriesData(categories));

      return { error: null, data: response.data };
    } catch (error) {
      return { error: error.message || "Failed to load products" };
    }
  };
