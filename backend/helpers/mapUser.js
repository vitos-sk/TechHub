module.exports = function mapUser(user) {
  return {
    id: user._id,
    login: user.login,
    email: user.email,
    role: Number(user.role),
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
