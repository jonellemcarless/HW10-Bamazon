var mysql = require("mysql");
var inquirer = require("inquirer");
var selection = process.argv[2];

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
});

var managerMenu = function(){
	con.query("select * from products", function (err, products) {
	if(err){
		return err;
	}

	console.log('Menu: 1) View Products for Sale    2) View low Inventory     3) Add to Inventory     4) Add new Product    5) Exit');

	inquirer.prompt(['Option'], function (err, result) {

		switch(result.Option) {
    case '1':
        for (var i = 0; i < products.length; i++) {
		console.log('Product ID: ' + products[i].itemid + ', Product Name: ' + products[i].departmentname + ' ' + products[i].ProductName + ', Price: ' + products[i].price + ', Stock: ' + products[i].stock);
		console.log('-------------------------------------------------------')
		};
		managerMenu();
        break;
    case '2':
    	for (var i = 0; i < products.length; i++) {
    	if (products[i].stock < 5) {
		console.log('Item: ' + products[i].departmentname + ' ' + products[i].productname + ', Stock: ' + products[i].stock);
		console.log('-------------------------------------------------------')
			};
		};
		managerMenu();
        break;
    case '3':
    	prompt.stop();
    	console.log('Add to Inventory');
    	prompt.get(['ProductID', 'Add'], function(err, result){
    		for (var i = 0; i < products.length; i++) {
    			if (result.itemid == products[i].itemid) {
    				con.query("UPDATE bamazon.products SET stock=" + (parseInt(products[i].stock) + parseInt(result.Add)) + " WHERE itemid=" + products[i].itemid +";", function (err, products) {
    						managerMenu();
    					}); //query
    			} //if
    		}//for	
    	});
        break;
    case '4':
        inquirer.stop();
    	console.log('Add a Product');
    	inquirer.prompt(['Product', 'Department', 'Price', 'Stocknode'], function(err, result){
    				con.query("INSERT INTO bamazon.products (productname, departmentname, price, stock) VALUES (" + result.product + ", " + result.department + ", " + result.price + ", " + result.quantity + ");", function (err, products) {
    					if(err){
    						return err;
    					};
    					console.log('updated');
    					managerMenu();
    					}); //query
    	});
        break;
    case '5':
    	console.log('Ending session');
        process.exit()
        break;
    default:
        console.log('Not an Option');
}

}); //prompt
	

}); //query
};
console.log('Welcome to the manager menu');
managerMenu();