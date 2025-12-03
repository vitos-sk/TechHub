const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    long_description: { type: String },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) =>
          validator.isURL(v, {
            protocols: ["http", "https"],
            require_tld: false,
            require_protocol: true,
          }),
        message: "Invalid URL format",
      },
    },
    stock_quantity: { type: Number, required: true },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
