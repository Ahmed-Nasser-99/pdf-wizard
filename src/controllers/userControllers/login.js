const User = require("../../models/userModel");
const { signIn } = require("../../utils/authGuard");


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      status: "failed",
      message: "email or password is incorrect",
    });
  }
  if (!user.authenticate(password)) {
    return res.status(401).json({
      status: "failed",
      message: "email or password is incorrect",
    });
  }
  const token = signIn(user.id);
  res.status(200).json({
    status: "ok",
    data: { user, token },
  });
};

module.exports = login;
