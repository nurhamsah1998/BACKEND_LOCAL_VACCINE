const express = require('express');
const app = express();
const moment = require('moment');
const fs = require('fs');
const { ERROR_PHONE_VALIDATION, NONE } = require('../../Message/message.js');

app.post('/', async (req, res) => {
  var waktu = moment().format('MMMM Do YYYY, h:mm:ss a');
  const body = {
    id: req.body.id,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    dad_name: req.body.dad_name,
    mom_name: req.body.mom_name,
    gender: req.body.gender,
    date: waktu,
    matematika: req.body.matematika || null,
    kejuruan: req.body.kejuruan || null,
    bahasa_indonesia: req.body.bahasa_indonesia || null,
    pendidikan_agama: req.body.pendidikan_agama || null,
  };
  const raw = fs.readFileSync('Server/dataBase.json', 'utf-8');
  const file = JSON.parse(raw);
  const duplicat = file.find((i) => i.phone === req.body.phone);
  if (duplicat) {
    res.status(666).send(ERROR_PHONE_VALIDATION);
    return false;
  } else {
    file.push(body);
    fs.writeFileSync('Server/dataBase.json', JSON.stringify(file));
    res.send('Success Post it!');
    console.log(body);
  }
});
module.exports = app;
