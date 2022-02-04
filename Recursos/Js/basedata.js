let mysql = require("mysql");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "bd_myreview"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});