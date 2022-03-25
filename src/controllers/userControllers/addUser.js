const Users = require("../../database");

function addUser(req, res) {
  const { email, name, password } = req.body;

  const newUser = {
    email,
    name,
    password,
    id: Date.now(),
  };
  console.log(!password);
  if (!email || !name || !password) {
    res.status(400).json({
      status: "failed",
      message: "send all required data",
    });
  }
  Users.push(newUser);

  res.status(200).json({
    status: "ok",
    data: newUser,
  });
}

module.exports = addUser;
