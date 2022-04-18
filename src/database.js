const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(
      `mongodb+srv://ahmed:${process.env.MONGODB_PASSWORD}@cluster0.azwhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    .then(() => console.log("Connected to mongoDB"))
    .catch((e) => console.log(e.message));
};

module.exports = connectDB;
