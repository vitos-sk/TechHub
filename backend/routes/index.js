const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
router.use(cookieParser());

const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/role");

const { register, login, getUsers } = require("../controllers/user");
const {
  addProduct,
  getProducts,
  editProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/product");
const { getCart, addToCart, removeFromCart } = require("../controllers/cart");
const { addCategiry, getCategories } = require("../controllers/categories");

const mapUser = require("../helpers/mapUser");
const mapProduct = require("../helpers/mapProduct");
const mapCategory = require("../helpers/mapCategory");
const mapCart = require("../helpers/mapCart");

router.get("/api/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.send(Buffer.from("<h2>Test String</h2>"));
});

router.post("/api/register", async (req, res) => {
  try {
    const { login, email, password } = req.body;

    if (!login || !email || !password) {
      return res.status(400).send({ error: "Login, email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "Invalid email format" });
    }

    if (login.length < 5 || login.length > 32) {
      return res.status(400).send({ error: "Login must be between 5 and 32 characters" });
    }

    if (password.length < 6 || password.length > 32) {
      return res
        .status(400)
        .send({ error: "Password must be between 6 and 32 characters" });
    }

    const { user, token } = await register(login, email, password);
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ error: "Invalid email format" });
    }

    const { user, token } = await login(email, password);
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .send({
        error: null,
        user: mapUser(user),
      });
  } catch (error) {
    res.status(401).send({
      error: error.message || "Unknown error",
    });
  }
});

router.post("/api/logout", async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true }).status(200).send({ error: null });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/users", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).send({ error: null, data: users.map(mapUser) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/products", async (req, res) => {
  try {
    const { page, limit, search, category } = req.query;

    const productsData = await getProducts(search, page, limit, category);
    const mappedProducts = productsData.products.map(mapProduct);

    res.status(200).send({
      error: null,
      data: {
        products: mappedProducts,
        lastPage: productsData.lastPage,
        categories: productsData.categories.map(mapCategory),
        totalCount: productsData.totalCount,
      },
    });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }
    res.status(200).send({ error: null, data: mapProduct(product) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.post("/api/products", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const { name, price, description, image, category_id } = req.body;

    if (!name || !price || !description || !category_id) {
      return res
        .status(400)
        .send({ error: "Name, price, description and category_id are required" });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).send({ error: "Price must be a positive number" });
    }

    const product = await addProduct(req.body);
    const mappedProduct = mapProduct(product);

    res.status(201).send({ error: null, data: mappedProduct });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

router.patch(
  "/api/products/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const { price } = req.body;

      if (price !== undefined && (typeof price !== "number" || price <= 0)) {
        return res.status(400).send({ error: "Price must be a positive number" });
      }

      const updatedProduct = await editProduct(req.params.id, req.body);

      if (!updatedProduct) {
        return res.status(404).send({ error: "Product not found" });
      }

      res.status(200).send({ error: null, data: mapProduct(updatedProduct) });
    } catch (error) {
      res.status(400).send({ error: error.message || "Unknown Error" });
    }
  }
);

router.delete(
  "/api/products/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const deletedProduct = await deleteProduct(req.params.id);
      if (!deletedProduct) {
        return res.status(404).send({ error: "Product not found" });
      }
      res.status(200).send({ error: null });
    } catch (error) {
      res.status(500).send({ error: error.message || "Unknown error" });
    }
  }
);

router.get("/api/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send({ error: null, data: categories.map(mapCategory) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.post(
  "/api/categories",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).send({ error: "Category name is required" });
      }

      const category = await addCategiry(req.body);
      res.status(201).send({ error: null, data: mapCategory(category) });
    } catch (error) {
      res.status(400).send({ error: error.message || "Unknown error" });
    }
  }
);

router.post("/api/cart", authenticated, async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    if (!product_id) {
      return res.status(400).send({ error: "Product ID is required" });
    }

    if (quantity !== undefined && (typeof quantity !== "number" || quantity < 0)) {
      return res.status(400).send({ error: "Quantity must be a non-negative number" });
    }

    const cart = await addToCart(req.user.id, req.body);
    res.status(200).send({ error: null, data: mapCart(cart) });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/cart", authenticated, async (req, res) => {
  try {
    const cart = await getCart(req.user.id);
    res.status(200).send({ error: null, data: mapCart(cart) });
  } catch (error) {
    res.status(500).send({ error: error.message || "Unknown error" });
  }
});

router.delete("/api/cart/:productId", authenticated, async (req, res) => {
  try {
    const productId = req.params.productId;

    const cart = await removeFromCart(req.user.id, productId);

    res.status(200).send({ error: null, data: mapCart(cart) });
  } catch (error) {
    res.status(400).send({ error: error.message || "Unknown error" });
  }
});

router.post("/api/create-admin", async (req, res) => {
  const bcrypt = require("bcrypt");
  const User = require("../models/User");

  try {
    const exists = await User.findOne({ email: "admin@techhub.com" });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    const admin = await User.create({
      login: "admin",
      email: "admin@techhub.com",
      password: hashedPassword,
      role: 1,
    });

    res.status(201).json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
