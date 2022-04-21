const User = require("../../models/userModel");
const { signIn } = require("../../utils/authGuard");

async function register(req, res) {
  try {
    const { email, name, password } = req.body;
    const user = await User.create({
      email,
      name,
      password,
    });

    if (!email || !name || !password) {
      res.status(400).json({
        status: "failed",
        message: "send all required data",
      });
    }
    const token = signIn(user.id);
    res.status(200).json({
      status: "ok",
      data: { user, token },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: error.message,
    });
  }
}

module.exports = register;
