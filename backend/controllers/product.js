const Product = require("../models/Product");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function addProduct(product) {
  const newProduct = await Product.create(product);

  await newProduct.populate({
    path: "category_id",
    select: "name description",
  });

  return newProduct;
}

async function editProduct(id, product) {
  const newProduct = await Product.findByIdAndUpdate(id, product, {
    new: true,
  });

  await newProduct.populate({
    path: "category_id",
    select: "name description",
  });

  return newProduct;
}

async function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}

async function getProducts(search = "", page = 1, limit = 9, categoryId = "all") {
  let categoryFilter = {};

  if (categoryId !== "all") {
    try {
      categoryFilter = { category_id: new ObjectId(categoryId) };
    } catch (e) {
      return {
        products: [],
        lastPage: 1,
        categories: await Category.find(),
        totalCount: 0,
      };
    }
  }

  const searchFilter = { name: { $regex: search, $options: "i" } };

  const filter = { ...searchFilter, ...categoryFilter };

  const categories = await Category.find();

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .sort({ createdAt: -1 })
      .populate({ path: "category_id", select: "name description" }),
    Product.countDocuments(filter),
  ]);

  return {
    products,
    lastPage: Math.ceil(totalCount / Number(limit)),
    categories,
    totalCount,
  };
}

async function getProduct(id) {
  return Product.findOne({ _id: id }).populate({
    path: "category_id",
    select: "name description",
  });
}
module.exports = { addProduct, getProducts, editProduct, deleteProduct, getProduct };
