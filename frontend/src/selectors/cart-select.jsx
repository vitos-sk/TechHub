export const cartSelect = (state) =>
  state.cart || {
    user_id: null,
    items: [],
    added_at: null,
    id: null,
  };
