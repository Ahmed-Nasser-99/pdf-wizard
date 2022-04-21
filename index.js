const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const deleteUser = require("./src/controllers/userControllers/deleteUser");
const addUser = require("./src/controllers/userControllers/addUser");
const getAllUsers = require("./src/controllers/userControllers/getAllUsers");
const updateUser = require("./src/controllers/userControllers/updateUser");
const getUser = require("./src/controllers/userControllers/getUser");
const postFile = require("./src/controllers/fileControllers/postFile");
const connectDB = require("./src/database");
const upload = require("./src/utils/multer")

const { protect } = require("./src/utils/authGuard");

dotenv.config({ path: "./.env" });
connectDB();

const app = express();

if (!process.env.CLOUD_NAME) {
  throw new Error('CLOUD_NAME must be defined');
}
if (!process.env.API_SECRET) {
  throw new Error('API_SECRET must be defined');
}
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}
if (!process.env.API_KEY) {
  throw new Error('API_KEY must be defined');
}

app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/api/users/:id", getUser);
app.get("/api/users", getAllUsers);
app.post("/api/users", addUser);

app.use(protect)

app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser);
app.post("/api/files",upload.single("file"), postFile);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
