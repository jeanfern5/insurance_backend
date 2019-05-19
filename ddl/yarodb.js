#!/usr/bin/env node
// This is a stand alone script 
const mysql = require('mysql');


function createYaroUserTable(connection) {
	connection.query(`CREATE TABLE YaroDB.YARO_USER(
		yaro_user_id VARCHAR(64)
		, first_name VARCHAR(64)
		, last_name VARCHAR(64)
		, user_added_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)
		`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create table YaroDB because it already exists.")
				}else{
				console.log(`Unhandled error ${error.code} `)
				}
			} else {
				console.log("Successfully created YaroDB.YARO_USER")
			}
		}
	);
};

function createYaroClientTable(connection) {
	connection.query(`CREATE TABLE YaroDB.YARO_CLIENT(
		client_id VARCHAR(64)
		, client_name VARCHAR(64)
		, client_added_date  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)
		`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create table YaroDB because it already exists.")
				}else{
				console.log(`Unhandled error ${error.code} `)
				}
			} else {
				console.log("Successfully created YaroDB.YARO_CLIENT")
			}
		}
	);
};

function dropYaroUserTable(connection) {
	connection.query("DROP TABLE YaroDB.YARO_USER"
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_BAD_TABLE_ERROR") {
				        console.log("Failed to drop table YaroDB.YARO_USER because it does not exist")
				}else{
				    console.log(`Unhandled error ${error.code} `)
				}
			} else {
				console.log("Successfully dropped YaroDB.YARO_USER")
			} 
		}
	);
} ;


module.exports = {
	createYaroUserTable, 
	createYaroClientTable, 
	dropYaroUserTable
};




