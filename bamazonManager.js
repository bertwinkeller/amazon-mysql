


// require node packages
const mysql = require('mysql2');
const inquirer = require('inquirer');


// creates sql conncection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});
inquirer.prompt([
    {
        type: 'list',
        name: 'inventoryOptions',
        choices: ['View products for sale','View low inventory','Add to inventory','Add new product'],
        message: 'Choose one of the options listed'
    }
    
  ])
  .then(({inventoryOptions}) => {
   switch(inventoryOptions){
       case 'View products for sale': 
        viewProducts();
        break;
        case 'View low inventory': 
       
        break;
        case 'Add to inventory':

        break;
        case 'Add new product':
     
        break
   }

  });


  function viewProducts(){
    db.connect(function(err) {
        if (err) throw err;
        db.query("SELECT item_id,product_name,department_name,price,stock_quantity FROM products", function (err, result) {
          if (err) throw err;
          console.log(`------Welcome to Bamazon-------`)
          console.log('------Available Products-------')
          for(let i=0;i<result.length;i++){
          console.log(`-------------------------------`)
          console.log(`ID: ${result[i].item_id}`)
          console.log(`Item: ${result[i].product_name}`)
          console.log(`Department: ${result[i].department_name}`)
          console.log(`Price: ${result[i].price}`)
          console.log(`Department Name: ${result[i].department_name}`)
          console.log(`Quantity: ${result[i].stock_quantity}`)
          console.log(`-------------------------------`)
    
          }
  }
