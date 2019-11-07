var mysql = require('mysql2');

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM products", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });