const cloudinary = require('cloudinary').v2;
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: parseInt(process.env.API_KEY),
  api_secret: process.env.API_SECRET,
});

module.exports = cloudinary;
