const Users = require('../../database');

function updateUser(req, res) {
  const { email, name, oldPassword, newPassword } = req.body;
  // console.log(req.params.id);
  let id = req.params.id;
  id = Users.findIndex((user) => {
    return user.id == id;
  });
  if (id === -1) {
    res.status(404).send({ message: 'Not Found' });
    return;
  }

  // console.log(Users);
  if (oldPassword !== Users[id].password) {
    res.status(401).send({ message: 'you entered a wrong password' });
    return;
  }
  // change the value if the user provided it, otherwise keep the old value untouched
  Users[id].name = name || Users[id].name;
  Users[id].email = email || Users[id].email;
  Users[id].password = newPassword || Users[id].password;

  const updatedUser = Users[id];
  console.log(updatedUser);
  res.status(200).send({ updatedUser });
}

module.exports = updateUser;
