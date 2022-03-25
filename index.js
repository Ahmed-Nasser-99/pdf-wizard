
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const getAllUsers = require("./src/controllers/userControllers/getAllUsers");

const addUser = require("./src/controllers/userControllers/addUser");

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const addUser = require('./src/controllers/userControllers/addUser');
const updateUser = require('./src/controllers/userControllers/updateUser');
const getUser = require("./src/controllers/userControllers/getUser");




const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.get("/api/test", (req, res) => {
  res.send({ message: "We are just testing" }).status(200);



// get
app.get("/api/users/:id", getUser);
app.get('/api/test', (req, res) => {
  res.send({ message: 'We are just testing' }).status(200);

});

app.get("/api/users", getAllUsers);


// post

app.post('/api/users', addUser);

// put
app.put('/api/users/:id', updateUser);

// delete

app.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});
