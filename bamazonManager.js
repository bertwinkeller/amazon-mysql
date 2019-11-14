


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
function initPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'inventoryOptions',
            choices: ['View products for sale', 'View low inventory', 'Add to inventory', 'Add new product'],
            message: 'Choose one of the options listed'
        }

    ])
        .then(({ inventoryOptions }) => {
            switch (inventoryOptions) {
                case 'View products for sale':
                    viewProducts();
                    break;
                case 'View low inventory':
                    viewLowInventory();
                    break;
                case 'Add to inventory':
                    addToInventory();
                    break;
                case 'Add new product':

                    break
            }

        });
}


function viewProducts() {
    db.query("SELECT item_id,product_name,department_name,price,stock_quantity FROM products", function (err, result) {
        if (err) throw err;
        console.log(`------Welcome to Bamazon-------`)
        console.log('------Available Products-------')
        for (let i = 0; i < result.length; i++) {
            console.log(`-------------------------------`)
            console.log(`ID: ${result[i].item_id}`)
            console.log(`Item: ${result[i].product_name}`)
            console.log(`Department: ${result[i].department_name}`)
            console.log(`Price: ${result[i].price}`)
            console.log(`Department Name: ${result[i].department_name}`)
            console.log(`Quantity: ${result[i].stock_quantity}`)
            console.log(`-------------------------------`)

        }
    })
    initPrompt();
}

function viewLowInventory() {

    db.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, result) {
        if (err) throw err;
        console.log(`------Welcome to Bamazon-------`)
        console.log('------Low Inventory Items------')
        for (let i = 0; i < result.length; i++) {
            console.log(`-------------------------------`)
            console.log(`ID: ${result[i].item_id}`)
            console.log(`Item: ${result[i].product_name}`)
            console.log(`Department: ${result[i].department_name}`)
            console.log(`Price: ${result[i].price}`)
            console.log(`Department Name: ${result[i].department_name}`)
            console.log(`Quantity: ${result[i].stock_quantity}`)
            console.log(`-------------------------------`)

        }
    })
    // brings back the prompt
    initPrompt();
}

// function to add inventory to existing items
function addToInventory() {
    inquirer.prompt([
        /* Pass your questions in here */
        {
            type: 'input',
            message: 'What is the ID of the item you would like to add to?',
            name: 'idprompt'
        },
        {
            type: 'input',
            message: 'How many units of this item need to be added?',
            name: 'qprompt'
        }
    ])
        .then(answers => {
            // Use user feedback to store variables for db query
            let id = answers.idprompt;
            let quantity_requested = answers.qprompt
            db.query(`SELECT * FROM products WHERE item_id=${id}`,
                function (err, results) {
                    if (err) {
                        console.log(err)
                    }
                    let product_data = results[0]
                    let updatedInvetory = product_data.stock_quantity + quantity_requested
                    db.query('UPDATE products SET ? WHERE ?', [{
                        stock_quantity: updatedInvetory
                    }, {
                        item_id: id
                    }])
                    console.log('Invetory Updated')
                    initPrompt();
                }

            )
        })
}
