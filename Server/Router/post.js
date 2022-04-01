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
    itemNo: dataBase.length + 1,
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    dad: req.body.dad,
    mom: req.body.mom,
    gender: req.body.gender,
    date: waktu,
    matematika: req.body.matematika || null,
    kejuruan: req.body.kejuruan || null,
    bahasa_indonesia: req.body.bahasa_indonesia || null,
    pendidikan_agama: req.body.pendidikan_agama || null,
  };
  const raw = fs.readFileSync('Server/dataStudent.json', 'utf-8');
  const file = JSON.parse(raw);
  const duplicat = file.find((i) => i.phone === req.body.phone);
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
