var mysql = require("promise-mysql");
var inquirer = require('inquirer');

console.log('Welcome to Bamazon. Choose a product from our inventory:  ');


// var con = mysql.createConnection({
// 	host: "localhost",
// 	user: "root",
// 	password: "",
// 	database: "bamazon"
// });

mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "bamazon"
}).then(function (conn) {
	return conn.query("select * from products")
}).then(function (products) {
	for (var i = 0; i < products.length; i++) {
		console.log('Product ID: ' + products[i].itemid + ', Product Name: ' + products[i].departmentname + ' ' + products[i].productname + ', Price: $' + products[i].price);
		console.log('------------------------------------------------------');
	};

	var questions = [{
			message: "Please enter Product ID",
			type: "input",
			name: "productId"
		},
		{
			message: "How many items?",
			type: "input",
			name: "quantity"
		},
		{
			message: "Add more?",
			type: "confirm",
			name: "addMore"
		}
	]

	inquirer
		.prompt(questions)
		.then(async answers => {
			console.log("ANSWER: ", answers)
			var orderTotal, newStockQuantity;

			for (var i = 0; i < products.length; i++) {
				if (answers.productId == products[i].itemid) {
					if (products[i].stock < answers.quantity) {
						console.log('Sorry, not enough stock');
						menu();
					}
					orderTotal = (answers.quantity * products[i].price);
					newStockQuantity = (products[i].stock - answers.quantity);
					console.log('Order total: ' + orderTotal)
				}
			}
			return [answers.productId, newStockQuantity, answers.addMore]
		}).then(function (response) {
			console.log("PRODID: ", response[0])
			console.log("TOTAL: ", response[1])

			return mysql.createConnection({
				host: "localhost",
				user: "root",
				password: "",
				database: "bamazon"
			}).then(function (conn) {
				conn.query("UPDATE products SET stock =" + response[1] + " WHERE itemid = " + response[0] + ";"),
					function (err, products) {
						if (err) {
							return err;
						}
						console.log("Products: " + products)
						if (response[2]) {
							menu();
						} else {
							console.log('Order Complete');
							process.exit();
						};
					}
			})
		}).then(function (response) {
			console.log(response)
		})
})

// con.connect(function (err) {
// 	if (err) {
// 		console.log(err);
// 	}
// 	console.log("You are connected");
// });

// var menu = function () {

// 	con.query("select * from products", function (err, products) {
// 		if (err) {
// 			return err;
// 		};

// 		for (var i = 0; i < products.length; i++) {
// 			console.log('Product ID: ' + products[i].itemid + ', Product Name: ' + products[i].departmentname + ' ' + products[i].productname + ', Price: $' + products[i].price);
// 			console.log('------------------------------------------------------');
// 		};

// var questions = [{
// 		message: "Please enter Product ID",
// 		type: "input",
// 		name: "productId"
// 	},
// 	{
// 		message: "How many items?",
// 		type: "input",
// 		name: "quantity"
// 	},
// 	{
// 		message: "Add more?",
// 		type: "confirm",
// 		name: "addMore"
// 	}
// ]

// 		inquirer.prompt(questions),
// 			function (err, answers) {
// 				if (err) {
// 					throw err
// 				}
// 				console.log("ANSWER: ", answers)
// 				var orderTotal, newStockQuantity;

// 				for (var i = 0; i < products.length; i++) {
// 					if (answers.productId == products[i].itemid) {
// 						if (products[i].stock < answers.quantity) {
// 							console.log('Sorry, not enough stock');
// 							menu();
// 						}
// 						orderTotal = (answers.quantity * products[i].price);
// 						newStockQuantity = (products[i].stock - answers.quantity);
// 						console.log('Order total: ' + orderTotal)
// 					}
// 				}
// 			}

// 		console.log("END")



// inquirer
// 	.prompt(questions)
// 	.then(answers => {
// 		console.log("ANSWER: ", answers)
// 		var orderTotal, newStockQuantity;

// 		for (var i = 0; i < products.length; i++) {
// 			if (answers.productId == products[i].itemid) {
// 				if (products[i].stock < answers.quantity) {
// 					console.log('Sorry, not enough stock');
// 					menu();
// 				}
// 				orderTotal = (answers.quantity * products[i].price);
// 				newStockQuantity = (products[i].stock - answers.quantity);
// 				console.log('Order total: ' + orderTotal)
// 			}
// 		}
// 	});

// console.log("QUERY")
// con.query("UPDATE products SET stock =" + newStockQuantity + " WHERE itemid = " + answers.productId + ";"),
// 	function (err, products) {
// 		if (err) {
// 			return console.log(err);
// 		}
// 		console.log("Products: " + products)
// 	}

// inquirer.prompt(['ProductID', 'Quantity', 'Add_More'], function (err, result) {

//   console.log('  ProductID: ' + result.itemid);
//   console.log('  Quantity: ' + result.Quantity);

//   for (var i = 0; i < products.length; i++) {
//   	if (result.ProductID == products[i].itemid) {
// if (products[i].stock < result.Quantity) {
// 	console.log('Sorry, not enough stock');
// 	return
// }

// var orderTotal = (result.Quantity * products[i].price);
// var newStockQuantity = (products[i].stock - result.Quantity);

// if (products[i].StockQuantity >= result.Quantity) {
// 	console.log('Order total: ' + orderTotal)
// };
//     }; //if


//   }; //for

// con.query("UPDATE products SET StockQuantity =" + newStockQuantity + " WHERE ProductID = " + result.itemid + ";", function(err, products){
// 		if (err) {
// 		return console.log(err);
// 	}
// 	if (result.Add_More == 'yes') {
// 		menu();
// 	}else{
// 		console.log('Order Complete');
// 	process.exit();
// };
//   	}); //query



// });

// 	}); //query
// } //function

// menu();