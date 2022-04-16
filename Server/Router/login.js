const express = require("express");
const app = express();
const moment = require("moment");
const fs = require("fs");
const userLogin = require("../UserLogin.json");
const uuid = require("uuid");
const {
  ERROR_PHONE_VALIDATION,
  NONE,
  SUCCESS_POST_NEW_STUDENT,
} = require("../../Message/message.js");
const jwt = require("jsonwebtoken");

app.post("/", async (req, res) => {
  const dataClient = req.body;
  dataClient.id = uuid.v1();
  const readData = fs.readFileSync("Server/UserLogin.json", "utf-8");
  const rawDataUserFile = JSON.parse(readData);
  // rawDataUserFile.push(dataClient);
  // fs.writeFileSync("Server/UserLogin.json", JSON.stringify(rawDataUserFile));
  const login = rawDataUserFile.find(
    (log) => log.username === req.body.username && log.password === req.body.password
  );
  if (login) {
    const token = jwt.sign(
      {
        name: login.username,
        password: login.password,
      },
      "nurhamsah123"
    );
    res.json({ status: "Success login", user: token });
  }
  if (!login) {
    res.status(666).send("Fail to login. Please check your username and password");
  }
});
module.exports = app;
