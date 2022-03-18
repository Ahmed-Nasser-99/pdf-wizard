
const Users = require("../../database")


// DELETE /Users/{id}
const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
    Users = Users.filter((user) => user.id !== id);
    res.send({ status: "ok" });
  };

  module.exports = deleteUser
