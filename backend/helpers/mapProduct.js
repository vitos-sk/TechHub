module.exports = function mapProduct(product) {
  return {
    id: product._id,
    name: product.name,
    description: product.description,
    long_description: product.long_description,
    price: product.price,
    image_url: product.image,
    category_id: product.category_id,
    stock_quantity: product.stock_quantity,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};
