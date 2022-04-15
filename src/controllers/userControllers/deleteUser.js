let Users = require("../../database");

// DELETE /Users/{id}
const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  userId = Users.findIndex((user) => {
    return user.id == id;
  });
  Users.splice(userId, 1);
  res.send({ status: "ok" });
};

module.exports = deleteUser;
