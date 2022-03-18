const Users = require("../../database");

// {
//     email : "Awda",
//     name : "awdaw",
//     password : "aawdaw"
// }

function addUser(req, res) {
  const { email, name, password } = req.body;
  //   const email = req.body.email;
  //     const password = req.body.password
  //     const name = req.body.name

  const newUser = {
    email,
    name,
    password,
    id: Date.now(),
  };
  Users.push(newUser);

  res.status(200).json({
    status: "ok",
    data: newUser,
  });
}

module.exports = addUser;
