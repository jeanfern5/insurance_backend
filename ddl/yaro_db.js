#!/usr/bin/env node
// Stand alone script 

function createYaroDatabase(connection){
	connection.query(`CREATE DATABASE YaroDB`,
		function (error, results, fields) {
			if (error) {
				if (error.code === "ER_DB_CREATE_EXISTS") {
					console.log(`Failed to create YaroDB database because it already exists.`);
				}else{
					console.log(`Unhandled error ${error}`);
				}
			} else {
				console.log(`Successfully created YaroDB database`);
				
			}
		}
	)
};

function createYaroUserTable(connection) {
	connection.query(`CREATE TABLE YaroDB.YARO_USER(
		yaro_user_id INT AUTO_INCREMENT PRIMARY KEY,
		email VARCHAR(255) UNIQUE NOT NULL,
		username VARCHAR(64) UNIQUE NOT NULL,
		first_name VARCHAR(64) NOT NULL,
		last_name VARCHAR(64) NOT NULL,
		city VARCHAR(64) NOT NULL,
		state VARCHAR(64) NOT NULL,
		zip INT NOT NULL,
		dob DATE NOT NULL,
		user_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create YaroDB.YARO_USER table because it already exists.");
				} else {
					console.log(`Unhandled error: ${error}`);
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
		client_db_name VARCHAR(255) NOT NULL,
		client_name VARCHAR(255) NOT NULL,
		client_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create YaroDB.YARO_CLIENT table because it already exists.");
				}else{
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log("Successfully created YaroDB.YARO_CLIENT table");
			}
		}
	)
};

function createYaroActiveUserTable(connection) {
	connection.query(`CREATE TABLE YaroDB.YARO_ACTIVE_USER(
		yaro_user_id INT NOT NULL,
		client_id INT NOT NULL,
		active BOOL NOT NULL
	)`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create YaroDB.YARO_ACTIVE_USER table because it already exists.");
				}else{
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log("Successfully created YaroDB.YARO_ACTIVE_USER table");
			}
		}
	)
};

function dropYaroDatabase(connection) {
	connection.query(`DROP DATABASE YaroDB`
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_DB_DROP_EXISTS") {
					console.log(`Failed to drop YaroDB database because it does not exist.`);
				}else{
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log(`Successfully dropped YaroDB database.`);
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
				    console.log(`Unhandled error: ${error}`);
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
				    console.log(`Unhandled error: ${error.code}`);
				}
			} else {
				console.log("Successfully dropped YaroDB.YARO_CLIENT table");
			} 
		}
	)
};

function dropYaroActiveUserTable(connection) {
	connection.query("DROP TABLE YaroDB.YARO_ACTIVE_USER"
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_BAD_TABLE_ERROR") {
				    console.log("Failed to drop YaroDB.YARO_ACTIVE_USER table because it does not exist.");
				} else {
				    console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log("Successfully dropped YaroDB.YARO_ACTIVE_USER table");
			} 
		}
	)
};


module.exports = {
	createYaroDatabase,
	createYaroUserTable, 
	createYaroClientTable, 
	createYaroActiveUserTable,

	dropYaroDatabase,
	dropYaroUserTable,
	dropYaroClientTable,
	dropYaroActiveUserTable
};




