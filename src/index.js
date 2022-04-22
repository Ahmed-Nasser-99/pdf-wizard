const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const deleteUser = require("./controllers/userControllers/deleteUser");
const register = require("./controllers/userControllers/register");
const getAllUsers = require("./controllers/userControllers/getAllUsers");
const updateUser = require("./controllers/userControllers/updateUser");
const login = require("./controllers/userControllers/login");
const postFile = require("./controllers/fileControllers/postFile");
const getAllFiles = require("./controllers/fileControllers/getAllFiles");
const getFile = require("./controllers/fileControllers/getFile");
const updateFile = require("./controllers/fileControllers/updateFile");
const convertFile = require("./controllers/fileControllers/convertFile")


const connectDB = require("./database");
const upload = require("./utils/multer")
const convert = require('./utils/converter')

const { protect } = require("./utils/authGuard");

const deleteFile = require("./controllers/fileControllers/deleteFile");



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
app.use(express.json());
app.get('/api',(req,res)=>{
  res.send('Yay, server is running')
})

app.post("/api/users/login", login);
app.get("/api/users", getAllUsers);
app.post("/api/users/register", register);

app.use(protect)

app.delete("/api/users/:id", deleteUser);
app.put("/api/users/:id", updateUser);
app.delete("/api/files/:id",deleteFile);
app.get("/api/files/:id", getFile);
app.get("/api/files", getAllFiles);
app.put("/api/files/:id", updateFile);
app.post("/api/files",upload.single("file"), postFile);
app.post("/api/files/convert",upload.single("file"),convert, convertFile);


app.listen(process.env.PORT || 8080,'0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
