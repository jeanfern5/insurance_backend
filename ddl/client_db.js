//Use this endpoint to create a customer database
const mysql = require('mysql');

function createClientDatabase( connection, clientName){
	connection.query(`CREATE DATABASE ${clientName}`,
		function (error, results, fields) {
			if (error) throw error;
				console.log(results)
				console.log(fields)
		}
	);
};

function createClientClaimsTable(connection, clientName){
	connection.query(`CREATE TABLE ${clientName}.CLAIMS (
		claim_id VARCHAR(64),
		claim_type_id VARCHAR(64),
		yaro_user_id VARCHAR(64),
		claim_amount INTEGER
		)`, 
		function (error, results, fields) {
			if (error) throw error;
			console.log(results)
			console.log(fields)
		}
	);
};

function createClientClaimTypeTable(connection, clientName){
	connection.query(`CREATE TABLE ${clientName}.CLAIM_TYPE (
		claim_id VARCHAR(64),
		description VARCHAR(512),
		)`, 
		function (error, results, fields) {
			if (error) throw error;
			console.log(results)
			console.log(fields)
		}
	);
};

module.exports = { 
	createClientDatabase, 
	createClientClaimsTable, 
	createClientClaimTypeTable
}



/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].solution);
});
*/



