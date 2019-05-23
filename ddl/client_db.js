//Use this endpoint to create a customer database

function createClientDatabase(connection, clientName){
	connection.query(`CREATE DATABASE ${clientName}`,
		function (error, results, fields) {
			if (error) {
				if (error.code === "ER_DB_CREATE_EXISTS") {
					console.log(`Failed to create ${clientName} database because it already exists.`);
				}else{
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log(`Successfully created ${clientName} database`);
			}
		}
	)
};

function insertClientDetailsIntoYaroDB(connection, clientName){
	try {
		connection.query(`INSERT INTO YaroDB.YARO_CLIENT(client_db_name, client_name)
					 VALUES ("${clientName}", "${clientName}")`),

		console.log(`Successfully added client details to YaroDB.YARO_CLIENT table`);
	} catch {
		console.log(`Error addeding client details to YaroDB.YARO_CLIENT table`);

	}
};

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
					console.log(`Unhandled error: ${error}`);
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
		procedure_name VARCHAR(255) NOT NULL,
		description VARCHAR(512) NOT NULL
	)`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log(`Failed to create ${clientName}.CLAIM_TYPE table because it already exists.`);
				} else if (error.code === "ER_BAD_DB_ERROR") {
					console.log(`Failed to create ${clientName}.CLAIM_TYPE table because database ${clientName} does not exist.`);
				} else {
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log(`Successfully created ${clientName}.CLAIM_TYPE table`);
			}
		}
	)
};


module.exports = { 
	createClientDatabase, 
	createClientClaimsTable, 
	createClientClaimTypeTable,

	insertClientDetailsIntoYaroDB,
};




