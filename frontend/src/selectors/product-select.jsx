export const productSelect = (state) =>
  state.product.currentProduct || {
    id: "",
    name: "",
    price: "",
    description: "",
    image_url: "",
    publishet_at: "",
  };
