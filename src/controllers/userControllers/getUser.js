const User = require("../../models/userModel");

const getUser = await (req, res) => {
  const {id} =req.params;
  const user = await User.findById(id)
  if (user) {
    res.json({
      status: "ok",
      data: user,
    });
  } else {
    res.status(404).json({
      status: "failed",
      message: "user not found",
    });
  }
};

module.exports = getUser;
