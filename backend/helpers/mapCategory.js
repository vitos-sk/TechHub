module.exports = function mapCategoty(category) {
  return {
    id: category._id,
    name: category.name,
    description: category.description,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};
