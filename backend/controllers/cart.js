const Cart = require("../models/Cart");
const Product = require("../models/Product");

async function getCart(userId) {
  let cart = await Cart.findOne({ user_id: userId });

  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
  }

  return cart;
}

async function addToCart(userId, productData) {
  const { product_id, quantity = 1 } = productData;

  let cart = await Cart.findOne({ user_id: userId });

  if (!cart) {
    cart = await Cart.create({ user_id: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product_id.toString() === product_id.toString()
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    const product = await Product.findById(product_id);
    if (!product) {
      throw new Error("Product not found");
    }

    cart.items.push({
      product_id,
      name: product.name,
      image_url: product.image,
      price: product.price,
      quantity,
    });
  }

  await cart.save();
  return cart;
}

async function removeFromCart(userId, productId) {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      {
        $pull: {
          items: { product_id: productId },
        },
      },
      { new: true }
    );

    if (!cart) {
      throw new Error("Cart not found");
    }

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { getCart, addToCart, removeFromCart };
