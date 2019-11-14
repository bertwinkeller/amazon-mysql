


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

// starting function to select manager function 
function initPrompt() {
    console.log()
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
                    addNewProduct();
                    break
            }

        });
}


function viewProducts() {
    db.query("SELECT item_id,product_name,department_name,price,stock_quantity FROM products", function (err, result) {
        if (err) throw err;
        const viewitemstxt = `

------Current Bamazon Items----
        `
        console.log(viewitemstxt)
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
        initPrompt();

    })

}

function viewLowInventory() {

    db.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, result) {
        if (err) throw err;
        const lowInvTxt = `

------Low Inventory Items------
      `
        console.log(lowInvTxt)
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
        initPrompt();

    })
    // brings back the prompt

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
            let quantity_requested = parseInt(answers.qprompt)

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
                    console.log('******Invetory Updated*****')
                    console.log('Select another action below')
                    initPrompt();
                }

            )
        })
}

// function to add products to the database
function addNewProduct() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter the product name:'
        },
        {
            name: 'dept',
            type: 'input',
            message: 'Enter the product department:'
        },
        {
            name: 'price',
            type: 'input',
            message: 'Enter the product price:',
            validate: (value) => {
                if (!isNaN(value) && value > 0) {
                    return true;
                } else {
                    console.log(chalk.red(` => Oops, please enter a number greater than 0`));
                    return false;
                }
            }
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'Enter the number of items in stock:',
            validate: (value) => {
                if (!isNaN(value) && value > 0) {
                    return true;
                } else {
                    console.log(chalk.red(` => Oops, please enter a number greater than 0`));
                    return false;
                }
            }
        }
    ]).then((answers) => {
        db.query('INSERT INTO products SET ?', {
            product_name: answers.name,
            department_name: answers.dept,
            price: answers.price,
            stock_quantity: answers.quantity
        })
        initPrompt();
    })
}

// Initializes prompt to start user input ß
initPrompt();

