const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const deleteUser = require("./src/controllers/userControllers/deleteUser");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.delete("/api/users/:id",deleteUser)


app.get("/api/test", (req, res) => {
  console.log("Hi Guys");
  res.send({ message: "We are just testing" }).status(200);
});
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
