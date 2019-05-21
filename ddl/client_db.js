//Use this endpoint to create a customer database


function createClientDatabase(connection, clientName){
	connection.query(`CREATE DATABASE ${clientName}`,
		function (error, results, fields) {
			if (error) {
				if (error.code === "ER_DB_CREATE_EXISTS") {
					console.log(`Failed to create ${clientName} database because it already exists.`);
				}else{
					console.log(`Unhandled error ${error.code}`);
				}
			} else {
				console.log(`Successfully created ${clientName} database`);
				insertClientDetails(connection, clientName);
				
				// connection.query(`INSERT INTO YaroDB.YARO_CLIENT(client_db_name, client_name)
				// 				  VALUES (${clientName}, ${clientName})`),
				// function (error, results, fields) {
				// 	if (error) {
				// 		console.log(`Unable to add client details to YaroDB.YARO_CLIENT table`)
				// 	}
				// }
			}
		}
	)
};

// function insertClientDetails(connection, clientName){
// 	connection.query(`INSERT INTO YaroDB.YARO_CLIENT(client_db_name, client_name)
// 					 VALUES (${clientName}, ${clientName})`),
// 		function (error, results, fields) {
// 			if (error) {
// 					console.log(`Unhandled error ${error.code}`);
// 			} else {
// 				console.log(`Successfully added client details to YaroDB.YARO_CLIENT table`);
// 			}
// 		}
// 	)
// };

function createClientClaimsTable(connection, clientName){
	connection.query(`CREATE TABLE ${clientName}.CLAIMS (
		claim_id INT AUTO_INCREMENT PRIMARY KEY,
		yaro_user_id INT NOT NULL,
		client_id INT NOT NULL,
		claim_type_id INT NOT NULL,
		claim_amount INT NOT NULL
	)`,function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log(`Failed to create ${clientName}.CLAIMS table because it already exists.`);
				} else if (error.code === "ER_BAD_DB_ERROR") {
					console.log(`Failed to create ${clientName}.CLAIMS table because database ${clientName} does not exist.`);
				} else {
					console.log(`Unhandled error: ${error.code}`);
				}
			} else {
				console.log(`Successfully created ${clientName}.CLAIMS table`);
			}
		}
	)
};

function createClientClaimTypeTable(connection, clientName) {
	connection.query(`CREATE TABLE ${clientName}.CLAIM_TYPE (
		claim_type_id INT AUTO_INCREMENT PRIMARY KEY,
		procedure VARCHAR(255) NOT NULL,
		description VARCHAR(512) NOT NULL
	)`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log(`Failed to create ${clientName}.CLAIM_TYPE table because it already exists.`);
				} else if (error.code === "ER_BAD_DB_ERROR") {
					console.log(`Failed to create ${clientName}.CLAIM_TYPE table because database ${clientName} does not exist.`);
				} else {
					console.log(`Unhandled error: ${error.code}`);
				}
			} else {
				console.log(`Successfully created ${clientName}.CLAIM_TYPE table`);
			}
		}
	)
};

function dropClientDatabase(connection, clientName) {
	connection.query(`DROP DATABASE ${clientName}`
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_DB_DROP_EXISTS") {
					console.log(`Failed to drop ${clientName} database because it does not exist.`);
				}else{
					console.log(`Unhandled error: ${error.code}`);
				}
			} else {
				console.log(`Successfully dropped ${clientName} database.`);
			} 
		}
	)
};

function dropClientClaimsTable(connection, clientName) {
	connection.query(`DROP TABLE ${clientName}.CLAIMS`
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_DROP_ERROR") {
					console.log(`Failed to drop ${clientName}.CLIENT table because it was already removed.`);
				} else if (error.code === "ER_BAD_TABLE_ERROR") {
					console.log(`Failed to drop ${clientName}.CLIENT table because table does not exist.`);
				} else {
					console.log(`Unhandled error: ${error.code}`);
				}
			} else {
				console.log(`Successfully dropped ${clientName}.CLAIMS table`);
			} 
		}
	)
};

function dropClientClaimTypeTable(connection, clientName) {
	connection.query(`DROP TABLE ${clientName}.CLAIM_TYPE`
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_DROP_ERROR") {
					console.log(`Failed to drop ${clientName}.CLAIM_TYPE table because it was already removed.`);
				} else if (error.code === "ER_BAD_TABLE_ERROR") {
					console.log(`Failed to drop ${clientName}.CLAIM_TYPE table because table does not exist.`);
				} else {
					console.log(`Unhandled error: ${error.code}`);
				}
			} else {
				console.log(`Successfully dropped ${clientName}.CLAIM_TYPE table`);
			} 
		}
	)
};


module.exports = { 
	createClientDatabase, 
	createClientClaimsTable, 
	createClientClaimTypeTable,
	dropClientDatabase,
	dropClientClaimsTable,
	dropClientClaimTypeTable
}


/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].solution);
});
*/



