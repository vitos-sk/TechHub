const Category = require("../models/Category");

async function getCategories() {
  return Category.find();
}

async function getCategory(id) {
  return Category.findOne({ _id: id });
}

async function addCategiry(data) {
  return Category.create(data);
}

module.exports = { getCategories, getCategory, addCategiry };
