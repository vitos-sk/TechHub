import { ACTION_TYPE } from "./action-type";

export const setCategoriesData = (categoriesData) => ({
  type: ACTION_TYPE.SET_CATEGORIES_DATA,
  payload: categoriesData,
});
