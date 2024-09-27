const express = require("express");
const Users = require("../schemas/userSchema.js");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../utils");
const jwt = require("jsonwebtoken");
const { isAuthenticate } = require("../middlewares/isAuthenticate.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    // validation
    const { name, email, password, department, role, notificationToken } =
      req.body;
    console.log(req.body);
    if (!name || !email || !password || !department || !role) {
      return res.send({ success: false, message: "Please enter all fields" });
    }

    const emal = email?.toLowerCase();
    // check if email already exists
    const user = await Users.findOne({
      email: { $regex: emal, $options: "i" },
    });
    if (user) {
      return res.send({ success: false, message: "Email already exists" });
    }
    // create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new Users({
      name,
      email: emal,
      password: hashedPass,
      department,
      role,
      notificationToken,
    });

    // save user to database
    await newUser.save();

    // generate jwt token
    const token = jwt.sign({ user: newUser }, JWT_SECRET, {
      expiresIn: "100d",
    });

    return res.send({
      success: true,
      message: "User registered successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    console.error(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log('first')
    const { email, password, notificationToken } = req.body;
    if (!email || !password) {
      return res.send({ success: false, message: "Please enter all fields" });
    }

    let emal = email?.toLowerCase();
    // check if user exists
    const user = await Users.findOne({
      email: { $regex: emal, $options: "i" },
    });
    if (!user) {
      return res.send({ success: false, message: "Users not found" });
    }
    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({ success: false, message: "Invalid password" });
    }
    // create and send jwt token

    // generate token

    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: "100d" });

    user.notificationToken = notificationToken;

    await user?.save();

    return res.send({
      success: true,
      token,
      message: "user login successfully",
      user: user,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.get("/check-authentication", isAuthenticate, async (req, res) => {
  try {
    console.log(req.user);

    const user = await Users.findOne({ email: req?.user?.email });

    if (!user) return res.send({ success: false, message: "User not found" });

    return res.send({ success: true, message: "user is authenticated", user });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.get("/get-all-users", isAuthenticate, async (req, res) => {
  try {
    if (req?.user?.role !== "hod" && req?.user?.role !== "director") {
      return res.send({
        success: false,
        message: "you are not hot or director to access this data",
      });
    }

    const users = await Users.find().sort({ createdAt: -1 });

    return res.send({ success: true, message: "users found", users: users });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

router.post("/verify-user", isAuthenticate, async (req, res) => {
  try {
    if (req?.user?.role !== "director") {
      return res.send({
        success: false,
        message: "you are not eligible to verify user",
      });
    }

    const user = await Users.findById(req.body?.userid);

    if (!user)
      return res.send({ success: false, message: "user not found to verify" });

    user.isVarified = true;

    await user.save();

    return res.send({
      success: true,
      message: "user verified successfully ",
      user,
    });
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
});

router.post("/delete-user", isAuthenticate, async (req, res) => {
  try {
    if (req?.user?.role !== "director")
      return res.send({
        success: false,
        message: "you are not eligible to delete user",
      });

    await Users.findByIdAndDelete(req?.body?.userid);

    return res.send({ success: true, message: "user deleted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.send({ success: false, message: error.message });
  }
});

module.exports = router;
