const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
    },
    department: String,
    isVarified: {
      type: Boolean,
      default: false,
    },
    notificationToken: String,
    phoneNumber: Number,
  },
  { timestamps: true }
);

const Users = mongoose.model("User", userSchema);

module.exports = Users;
