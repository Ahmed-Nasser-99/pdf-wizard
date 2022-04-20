const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signIn = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "randomSecret", {
    expiresIn: "30d",
  });
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(400);
      return next(new Error("PLease Login !"));
    }

    // 2- validate token
    const login = jwt.verify(token, process.env.JWT_SECRET || "randomSecret");
    const freshUser = await User.findById(login.id);

    if (!freshUser) {
      return next(new Error("Please Login Again !"));
    }

    req.user = freshUser;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = {
  signIn,
  protect,
};
