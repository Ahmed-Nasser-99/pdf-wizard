const Users = require("../../database");

const getUser = (req, res) => {
  const id = parseInt(req.params.id);
  const user = Users.find((user) => user.id === id);
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
