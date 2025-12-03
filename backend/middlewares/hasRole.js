module.exports = (role) => {
  return async (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).send({ error: "Access denied" });
    }
    next();
  };
};
