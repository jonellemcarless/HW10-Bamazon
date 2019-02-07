-- Create a new database called 'bamazon'
-- Connect to the 'master' database to run this snippet
USE master
GO
-- Create the new database if it does not exist already
IF NOT EXISTS (
    SELECT name
        FROM sys.databases
        WHERE name = N'bamazon'
)
CREATE DATABASE bamazon
GO

USE bamazon;
CREATE TABLE products (
itemid INTEGER(10) NOT NULL,
productname VARCHAR(10) NOT NULL,
departmentname VARCHAR(20) NOT NULL,
price INTEGER(10) NOT NULL,
stock INTEGER(10) NOT NULL
);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1001, "Comforter", "Home", 100, 10);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1002, "Pillows", "Home", 50, 50);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1003, "Pet Bed", "Pets", 100, 50);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1004, "Leash", "Pets", 30, 100);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1005, "Sofa", "Furniture", 5000, 5);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1006, "Bookcase", "Furniture", 100, 10);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1007, "Boots", "Clothing", 150, 75);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1008, "Sweater", "Clothing", 100, 10);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1009, "Mirror", "Decor", 100, 10);

INSERT INTO products (itemid, productname, departmentname, price, stock)
VALUES (1010, "Poster", "Home", 10, 2);