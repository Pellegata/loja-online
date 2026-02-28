const express = require("express");
const cors = require("cors");
require("dotenv").config();
const Router = require('./routes')

const app = express();

app.use(cors());
app.use(express.json());
Router(app)

app.get("/", (req, res) => {
  res.json({ message: "API Loja de Roupas rodando 🚀" });
});

module.exports = app;