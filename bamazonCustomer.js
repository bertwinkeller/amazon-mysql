
// require node packages
var mysql = require('mysql2');
var inquirer = require('inquirer');



// creates sql conncection
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});

// queries for the products upon application run
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
      promptUser();
    });
 

  });

//   inquirer prompt to user on which to item to buy 
function promptUser(){
inquirer
  .prompt([
    /* Pass your questions in here */
    {
      type: 'input',
      message: 'What is the ID of the item you would like to buy?',
      name: 'idprompt'
    },
    {
      type: 'input',
      message: 'How mmmmmany items would you like to purchase?',
      name: 'qprompt'
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    console.log(answers)
  });
}