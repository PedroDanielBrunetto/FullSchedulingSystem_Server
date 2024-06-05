const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./router.js");
const pool = require("./Infra/mysql.js");

const app = express();

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.stack);
    return;
  }
  console.log("Conectado ao banco de dados.");
  connection.release();
});

app.use(
  cors({
    origin: ["http://localhost:5173", "https://www.martinezodontologia.com/"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(router);

module.exports = app;
