const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generate } = require("../helpers/token");
const ROLES = require("../constants/role");

async function register(login, email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exist");

  const user = await User.create({ login, email, password: passwordHash });

  const token = generate({ id: user._id });
  return { user, token };
}

async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid Password");

  const token = generate({ id: user._id });
  return { user, token };
}

async function getUsers() {
  return await User.find();
}

async function getRole() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.CUSTOMER, name: "Customer" },
    { id: ROLES.USER, name: "User" },
  ];
}

async function deleteUser(id) {
  return await User.findByIdAndDelete({ _id: id });
}

async function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, { returnDocument: "after" });
}
module.exports = {
  register,
  login,
  getRole,
  deleteUser,
  updateUser,
  getUsers,
};
