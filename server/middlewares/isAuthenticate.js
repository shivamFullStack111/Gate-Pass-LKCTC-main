const Users = require("../schemas/userSchema");
const { JWT_SECRET } = require("../utils");

const jwt = require("jsonwebtoken");

const isAuthenticate = async (req, res, next) => {
  try {
    console.log("hiiiiiiiiiiii");
    const { authorization } = req.headers;
    if (!authorization) {
      return res.send({ success: false, message: "token not found " });
    }

    // get user from jwt token
    const { user } = jwt.verify(authorization, JWT_SECRET);

    const usr = await Users.findOne({ email: user?.email });

    if (!usr) {
      return res.send({
        success: false,
        message: "token is invalid or user not found ",
      });
    }

    req.user = usr;
    next();
  } catch (error) {
    return res.send({ success: false, message: error.message });
  }
};

module.exports = {
  isAuthenticate,
};
