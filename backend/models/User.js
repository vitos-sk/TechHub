const mongoose = require("mongoose");
const role = require("../constants/role");

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, required: true, default: role.USER },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
