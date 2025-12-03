const { verify } = require("../helpers/token");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).send({ error: "Token not provided" });
    }

    const tokenData = verify(token);
    const user = await User.findById(tokenData.id);

    if (!user) {
      return res.status(401).send({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).send({ error: "Invalid token" });
  }
};
