import { ACTION_TYPE } from "../actions";

const initialState = {
  currentProduct: {
    id: "",
    name: "",
    price: "",
    description: "",
    image_url: "",
    publishet_at: "",
  },
  products: [],
  categories: [],
  pagination: {
    page: 1,
    totalPages: 1,
    totalCount: 0,
  },
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_PRODUCT_DATA:
      return {
        ...state,
        currentProduct: action.payload,
      };
    case ACTION_TYPE.SET_PRODUCTS_DATA:
      return {
        ...state,
        products: action.payload.products || [],
        pagination: {
          page: action.payload.page || state.pagination.page,
          totalPages: action.payload.totalPages || state.pagination.totalPages,
          totalCount: action.payload.totalCount || state.pagination.totalCount,
        },
      };
    case ACTION_TYPE.SET_CATEGORIES_DATA:
      return {
        ...state,
        categories: action.payload || [],
      };
    default:
      return state;
  }
};
