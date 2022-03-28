const express = require('express');
const app = express();
const fs = require('fs');

app.delete('/:id', (req, res) => {
  const { id } = req.params;
  let raw = fs.readFileSync('Server/dataBase.json', 'utf-8');
  let file = JSON.parse(raw);
  let item = file.filter((user) => user.id !== id);
  fs.writeFileSync('Server/dataBase.json', JSON.stringify(item));
  console.log(id);
  res.send('data berhasil dihapus');
});
module.exports = app;

// app.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     let raw = fs.readFileSync('Server/dataBase.json');
//     let file = JSON.parse(raw);
//     let fil = file.filter((user) => user.id !== id);
//     fs.writeFileSync('Server/dataBase.json', JSON.stringify(fil));
//     console.log(req.body, '<- ini');
//   });
