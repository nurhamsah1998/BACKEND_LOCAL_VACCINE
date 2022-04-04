const express = require('express');
const app = express();
const moment = require('moment');
const fs = require('fs');
const dataBase = require('../dataStudent.json');
const uuid = require('uuid');
const { ERROR_PHONE_VALIDATION, NONE, SUCCESS_POST_NEW_STUDENT } = require('../../Message/message.js');

app.post('/', async (req, res) => {
  var waktu = moment().format('LLL');
  const body = {
    id: uuid.v1(),
    itemNum: dataBase.length + 1,
    userProfile: [{ name: req.body.name }, { gender: req.body.gender }, { birt: req.body.birt }, { address: req.body.address }, { dad: req.body.dad }, { mom: req.body.mom }],
    email: req.body.email,
    phone: req.body.phone,
    dateIn: waktu,
    payment: req.body.payment,
  };
  const raw = fs.readFileSync('Server/dataStudent.json', 'utf-8');
  const file = JSON.parse(raw);
  const duplicat = file.find((i) => i.phone === req.body.phone);
  // Object.assign(body, { userID: uuid.v1() }, { date: waktu });
  if (duplicat) {
    res.status(666).send(ERROR_PHONE_VALIDATION);
    return false;
  } else {
    file.push(body);
    fs.writeFileSync('Server/dataStudent.json', JSON.stringify(file));
    res.send(SUCCESS_POST_NEW_STUDENT);
  }
});
module.exports = app;
