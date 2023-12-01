const mysql = require("mysql")
require('dotenv').config();

const SQL_HOST = process.env.MYSQL_HOST;
const SQL_USER = process.env.MYSQL_USER;
const SQL_PASSWORD = process.env.MYSQL_PASSWORD;
const SQL_DATABASE = process.env.MYSQL_DB;

const db = mysql.createConnection({
    host: SQL_HOST,
    user: SQL_USER,
    password: SQL_PASSWORD,
    database: SQL_DATABASE
})

module.exports = db