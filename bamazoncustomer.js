var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host	: 'localhost',
	port: 3306,
	user	: 'root',
	password: 'ilpp0210',
	database: 'bamazon'
});

connection.connect(function (err) {
	if(err){
		console.log (err);
	}
	console.log('You are connected');
});

var menu = function(){

	connection.query("select * from products", function(err, products){
	if (err) {
		return err;
	};

	for (var i = 0; i < products.length; i++) {
		console.log('Product ID: ' + products[i].ProductID + ', Product Name: ' + products[i].DepartmentName + ' ' + products[i].ProductName + ', Price: $' + products[i].Price);
	console.log('------------------------------------------------------');
	};

	prompt.get(['ProductID', 'Quantity', 'Add_More'], function (err, result) {

    console.log('  ProductID: ' + result.ProductID);
    console.log('  Quantity: ' + result.Quantity);

    for (var i = 0; i < products.length; i++) {
    	if (result.ProductID == products[i].ProductID) {
	    	if (products[i].StockQuantity < result.Quantity) {
	    		console.log('Sorry, not enough stock');
	    	}

	    var orderToatal = (result.Quantity * products[i].Price);
	    var newStockQuantity = (products[i].StockQuantity - result.Quantity);

	    	if (products[i].StockQuantity >= result.Quantity) {
	    		console.log('Order total: ' + orderToatal)
	    	};
	    }; //if

	    
    }; //for

    connection.query("UPDATE products SET StockQuantity =" + newStockQuantity + " WHERE ProductID = " + result.ProductID + ";", function(err, products){
			if (err) {
			return console.log(err);
		}
			if (result.Add_More == 'yes') {
				menu();
			}else{
				console.log('Order Complete');
			process.exit();
		};
    	}); //query



  }); //prompt

}); //query
}//function

console.log('Welcome to Bamazon. Choose a product from our inventory:  ');
menu();