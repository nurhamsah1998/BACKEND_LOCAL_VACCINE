const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.port || 8000;
const postRoter = require("./Server/Router/post.js");
const remove = require("./Server/Router/delete.js");
const dataBase = require("./Server/dataStudent.json");
const login = require("./Server/Router/login");

app.use(cors());
app.use(bodyParser.json());
app.use("/post", postRoter);
app.use("/remove", remove);
app.use("/login", login);

app.get("/", (req, res) => {
  res.send("Server Running Properly!");
});
app.get("/get", (req, res) => {
  res.send(dataBase);
});

app.listen(port, () => {
  console.log("Server Running!");
});
