#!/usr/bin/env node
// This is a stand alone script 
const mysql = require('mysql');


function createYaroUserTable(connection) {
	connection.query(`CREATE TABLE YaroDB.YARO_USER(
		yaro_user_id INT AUTO_INCREMENT PRIMARY KEY,
		email VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL,
		first_name VARCHAR(64) NOT NULL,
		last_name VARCHAR(64) NOT NULL,
		city VARCHAR(64),
		state VARCHAR(64) NOT NULL,
		zip VARCHAR(64) NOT NULL,
		dob DATE NOT NULL,
		user_added_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)
		`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create YaroDB.YARO_USER because it already exists.");
				} else {
					console.log(`Unhandled error: ${error.code} `);
				}
			} else {
				console.log("Successfully created YaroDB.YARO_USER table ");
			}
		}
	)
};

function createYaroClientTable(connection) {
	connection.query(`CREATE TABLE YaroDB.YARO_CLIENT(
		client_id INT AUTO_INCREMENT PRIMARY KEY,
		client_name VARCHAR(255),
		client_added_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)
		`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create YaroDB.YARO_CLIENT table because it already exists.");
				}else{
					console.log(`Unhandled error: ${error.code} `);
				}
			} else {
				console.log("Successfully created YaroDB.YARO_CLIENT table");
			}
		}
	)
};

function dropYaroUserTable(connection) {
	connection.query("DROP TABLE YaroDB.YARO_USER"
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_BAD_TABLE_ERROR") {
				    console.log("Failed to drop YaroDB.YARO_USER table because it does not exist.");
				} else {
				    console.log(`Unhandled error: ${error.code} `);
				}
			} else {
				console.log("Successfully dropped YaroDB.YARO_USER table");
			} 
		}
	)
};

function dropYaroClientTable(connection) {
	connection.query("DROP TABLE YaroDB.YARO_CLIENT"
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_BAD_TABLE_ERROR") {
				    console.log("Failed to drop YaroDB.YARO_CLIENT table because it does not exist.");
				} else {
				    console.log(`Unhandled error: ${error.code} `);
				}
			} else {
				console.log("Successfully dropped YaroDB.YARO_CLIENT table");
			} 
		}
	)
};


module.exports = {
	createYaroUserTable, 
	createYaroClientTable, 
	dropYaroUserTable,
	dropYaroClientTable
};




