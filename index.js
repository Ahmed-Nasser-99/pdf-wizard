const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const deleteUser = require("./src/controllers/userControllers/deleteUser");
const addUser = require("./src/controllers/userControllers/addUser");
const getAllUsers = require("./src/controllers/userControllers/getAllUsers");
const updateUser = require("./src/controllers/userControllers/updateUser");
const getUser = require("./src/controllers/userControllers/getUser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.delete("/api/users/:id", deleteUser);
app.get("/api/users/:id", getUser);
app.get("/api/users", getAllUsers);
app.post("/api/users", addUser);
app.put("/api/users/:id", updateUser);

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
