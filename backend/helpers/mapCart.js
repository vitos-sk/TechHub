module.exports = function (cart) {
  return {
    id: cart._id,
    user_id: cart.user_id,
    items: cart.items.map((item) => ({
      product_id: item.product_id.toString(),
      name: item.name,
      image_url: item.image_url,
      price: item.price,
      quantity: item.quantity,
    })),
    updatedAt: cart.updatedAt,
  };
};
