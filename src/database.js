const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to mongoDB"))
    .catch((e) => console.log(e.message));
};

module.exports = connectDB;
