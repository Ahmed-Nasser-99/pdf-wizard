const User = require('../../models/userModel');

async function updateUser(req, res) {
  const { email, name, oldPassword, newPassword } = req.body;
  // console.log(req.params.id);
  const id = req.params.id;

  const user = await User.findById(id);

  // console.log(Users);
  if (!user.authenticate(oldPassword)) {
    return res.status(401).json({
      status: "failed",
      message: "Invalid password",
    });
  }
  // change the value if the user provided it, otherwise keep the old value untouched
  user.email = email || user.email;
  user.password = newPassword || user.password;
  user.name = name || user.name;

  await user.save();

  console.log(user);
  res.status(200).send({ user });
}

module.exports = updateUser;
