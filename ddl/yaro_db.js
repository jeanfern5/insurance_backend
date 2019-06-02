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
		yaro_user_id VARCHAR(32) UNIQUE PRIMARY KEY,
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
		client_id VARCHAR(32) UNIQUE PRIMARY KEY,
		client_db_name VARCHAR(255) UNIQUE NOT NULL,
		client_name VARCHAR(255) UNIQUE NOT NULL,
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
		yaro_user_id VARCHAR(32) NOT NULL,
		client_id VARCHAR(32) NOT NULL,
		active BOOL NOT NULL,
		UNIQUE yaro_user_id_client_id (yaro_user_id, client_id)
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


module.exports = {
	createYaroDatabase,
	createYaroUserTable, 
	createYaroClientTable, 
	createYaroActiveUserTable,
};




