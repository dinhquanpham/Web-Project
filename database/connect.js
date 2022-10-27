require('dotenv/config');

var mysql = require("mysql");

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
})

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});