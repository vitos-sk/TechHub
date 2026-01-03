export const productsSelect = (state) => state.product.products || [];

export const categoriesSelect = (state) => state.product.categories || [];

export const productPaginationSelect = (state) =>
  state.product.pagination || {
    page: 1,
    totalPages: 1,
    totalCount: 0,
  };
