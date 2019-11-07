
// require node packages
var mysql = require('mysql2');
var inquirer = require('inquirer');



inquirer
  .prompt([
      {

      }
    /* Pass your questions in here */
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
  });
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT product_name,department_name,price FROM products", function (err, result, fields) {
      if (err) throw err;
      console.log(`------Welcome to Bamazon-------`)
      console.log('------Available Products-------')
      for(let i=0;i<result.length;i++){
      console.log(`-------------------------------`)
      console.log(`Item: ${result[i].product_name}`)
      console.log(`Department: ${result[i].department_name}`)
      console.log(`Price: ${result[i].price}`)
      console.log(`-------------------------------`)
      }
    });
  });