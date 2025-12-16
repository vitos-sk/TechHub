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
    const { user, token } = await register(
      req.body.login,
      req.body.email,
      req.body.password
    );
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: mapUser(user) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUser(user),
    });
  } catch (error) {
    res.send({
      error: error.message || "Unknown error",
    });
  }
});

router.post("/api/logout", async (req, res) => {
  try {
    res.cookie("token", "", { httpOnly: true }).send({ error: null });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/users", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const users = await getUsers();
    res.send({ error: null, data: users.map(mapUser) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/products", async (req, res) => {
  try {
    const { page, limit, search, category } = req.query;

    const productsData = await getProducts(search, page, limit, category);
    const mappedProducts = productsData.products.map(mapProduct);

    res.send({
      error: null,
      data: {
        products: mappedProducts,
        lastPage: productsData.lastPage,
        categories: productsData.categories.map(mapCategory),
        totalCount: productsData.totalCount,
      },
    });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/products/:id", async (req, res) => {
  try {
    const product = await getProduct(req.params.id);
    res.send({ error: null, data: mapProduct(product) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.post("/api/products", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  try {
    const product = await addProduct(req.body);

    const mappedProduct = mapProduct(product);

    res.send({ error: null, data: mappedProduct });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.patch(
  "/api/products/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const updatedProduct = await editProduct(req.params.id, req.body);

      res.send({ error: null, data: mapProduct(updatedProduct) });
    } catch (error) {
      res.send({ error: error.message || "Unknown Error" });
    }
  }
);

router.delete(
  "/api/products/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      await deleteProduct(req.params.id);
      res.send({ error: null });
    } catch (error) {
      res.send({ error: error.message || "Unknown error" });
    }
  }
);

router.get("/api/categories", async (req, res) => {
  try {
    const categories = await getCategories();
    res.send({ error: null, data: categories.map(mapCategory) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.post(
  "/api/categories",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    try {
      const category = await addCategiry(req.body);
      res.send({ error: null, data: mapCategory(category) });
    } catch (error) {
      res.send({ error: error.message || "Unknown error" });
    }
  }
);

router.post("/api/cart", authenticated, async (req, res) => {
  try {
    const cart = await addToCart(req.user.id, req.body);
    res.send({ error: null, data: mapCart(cart) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.get("/api/cart", authenticated, async (req, res) => {
  try {
    const cart = await getCart(req.user.id);
    res.send({ error: null, data: mapCart(cart) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

router.delete("/api/cart/:productId", authenticated, async (req, res) => {
  try {
    const productId = req.params.productId;

    const cart = await removeFromCart(req.user.id, productId);

    res.send({ error: null, data: mapCart(cart) });
  } catch (error) {
    res.send({ error: error.message || "Unknown error" });
  }
});

// TEMP: create admin (DELETE AFTER USE)
router.post("/api/create-admin", async (req, res) => {
  const bcrypt = require("bcrypt");
  const User = require("../models/User"); // убедись, что путь верный

  try {
    // проверяем, существует ли уже админ
    const exists = await User.findOne({ email: "admin@techhub.com" });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // хешируем пароль
    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    // создаем администратора
    const admin = await User.create({
      login: "admin",
      email: "admin@techhub.com",
      password: hashedPassword,
      role: 1, // 1 = admin
    });

    res.status(201).json({ message: "Admin created", admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
