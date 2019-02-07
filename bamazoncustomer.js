var mysql = require("mysql");
var inquirer = require('inquirer');

var con = mysql.createConnection({
	host	: "localhost",
	user	: "root",
	password: "",
	database: "bamazon"
});

con.connect(function (err) {
	if(err){
		console.log (err);
	}
	console.log("You are connected");
});

var menu = function(){

	con.query("select * from products", function(err, products){
	if (err) {
		return err;
	};

	for (var i = 0; i < products.length; i++) {
		console.log('Product ID: ' + products[i].itemid + ', Product Name: ' + products[i].departmentname + ' ' + products[i].productname + ', Price: $' + products[i].price);
	console.log('------------------------------------------------------');
	};

	inquirer.prompt(['ProductID', 'Quantity', 'Add_More'], function (err, result) {

    console.log('  ProductID: ' + result.itemid);
    console.log('  Quantity: ' + result.Quantity);

    for (var i = 0; i < products.length; i++) {
    	if (result.ProductID == products[i].itemid) {
	    	if (products[i].stock < result.Quantity) {
	    		console.log('Sorry, not enough stock');
	    	}

	    var orderToatal = (result.Quantity * products[i].price);
	    var newStockQuantity = (products[i].stock - result.Quantity);

	    	if (products[i].StockQuantity >= result.Quantity) {
	    		console.log('Order total: ' + orderToatal)
	    	};
	    }; //if

	    
    }; //for

    con.query("UPDATE products SET StockQuantity =" + newStockQuantity + " WHERE ProductID = " + result.itemid + ";", function(err, products){
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



  });

}); //query
}//function

console.log('Welcome to Bamazon. Choose a product from our inventory:  ');
menu();