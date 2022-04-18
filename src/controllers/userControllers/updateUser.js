const User = require('../../models/userModel');

async function updateUser(req, res) {
  const { email, name, oldPassword, newPassword } = req.body;
  // console.log(req.params.id);
  const id = req.params.id;

  const user = await User.findById(id);

  // console.log(Users);
  if (oldPassword !== user.password) {
    res.status(401).send({ message: 'you entered a wrong password' });
    return;
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
