const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});



userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  await bcrypt
    .hash(user.password, 10)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.methods.authenticate = function (password) {
  return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model("User", userSchema);

module.exports = User;
