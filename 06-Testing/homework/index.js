const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.send({
    message: "hola",
  });
});

app.get("/test", (req, res) => {
  res.send({
    message: "test",
  });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  res.send({ result: a + b });
});

app.post("/product", (req, res) => {
  const { a, b } = req.body;
  res.send({ result: a * b });
});

app.post("/sumArray", (req, res) => {
  const { array, num } = req.body;
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] + array[j] === num) res.send({ result: true });
    }
  }
  res.send({ result: false });
});

app.post("/numString", (req, res) => {
  const { string } = req.body;
  if (typeof string === "number" || string.length === 0) res.sendStatus(400);
  else res.send({ result: string.length });
});

app.post("/pluck", (req, res) => {
  const { array, property } = req.body;
  let keys = [];
  if (!Array.isArray(array) || property === "") {
    res.sendStatus(400);
  } else {
    keys = array.map((obj) => obj[property]);
    res.send({ result: keys });
  }
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
