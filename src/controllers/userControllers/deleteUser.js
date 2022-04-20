const Users = require("../../database");
const User = require("../../models/userModel");

// DELETE /Users/{id}
const deleteUser = async(req, res) => {
  const id = (req.params.id);
  const user = await User.deleteOne({ _id: id });
  
  res.send({ status: "ok" });
};

module.exports = deleteUser;
