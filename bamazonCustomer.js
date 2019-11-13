
// require node packages
const mysql = require('mysql2');
const inquirer = require('inquirer');



// creates sql conncection
 db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});

// queries for the products upon application run
db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT item_id,product_name,department_name,price FROM products", function (err, result) {
      if (err) throw err;
      console.log(`------Welcome to Bamazon-------`)
      console.log('------Available Products-------')
      for(let i=0;i<result.length;i++){
      console.log(`-------------------------------`)
      console.log(`ID: ${result[i].item_id}`)
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
      message: 'How many items would you like to purchase?',
      name: 'qprompt'
    }
  ])
  .then(answers => {
    // Use user feedback for... whatever!!
    let id = answers.idprompt;
    let quantity_requested = answers.qprompt

    db.query(`SELECT * FROM products WHERE item_id=${id}`,
    function(err, results){
      if (err){
        console.log(err)
      }
      let product_data = results[0]
      let price = product_data.price * quantity_requested
      let updated_quantity = product_data.stock_quantity - quantity_requested
      if(product_data.stock_quantity > quantity_requested){
        console.log(`The total for this order amounts to : ${price}`)
        console.log(`Purchasing ${quantity_requested} units of ${product_data.product_name}...`)
        db.query('UPDATE products SET ? WHERE ?', [{
          stock_quantity: updated_quantity,
        },{
          item_id: id
        }])
        console.log('Purhcase Successful')
        promptUser();
      }else{
        console.log(`Insufficient Quantity, unable to purchase ${quantity_requested} units`)
        promptUser();
      }
    }
    )
  });
}