const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const deleteUser = require("./src/controllers/userControllers/deleteUser");
const register = require("./src/controllers/userControllers/register");
const getAllUsers = require("./src/controllers/userControllers/getAllUsers");
const updateUser = require("./src/controllers/userControllers/updateUser");
const login = require("./src/controllers/userControllers/login");
const postFile = require("./src/controllers/fileControllers/postFile");
const getAllFiles = require("./src/controllers/fileControllers/getAllFiles");
const getFile = require("./src/controllers/fileControllers/getFile");
const updateFile = require("./src/controllers/fileControllers/updateFile");
const convertFile = require("./src/controllers/fileControllers/convertFile")


const connectDB = require("./src/database");
const upload = require("./src/utils/multer")
const convert = require('./src/utils/converter')

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

app.post("/api/users/login", login);
app.post("/api/users/register", register);

app.use(protect)

app.get("/api/users", getAllUsers);
app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser);
app.get("/api/files/:id", getFile);
app.get("/api/files", getAllFiles);
app.put("/api/files/:id", updateFile);
app.post("/api/files",upload.single("file"), postFile);
app.post("/api/files/convert",upload.single("file"),convert, convertFile);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
