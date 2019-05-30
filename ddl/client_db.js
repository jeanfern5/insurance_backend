//Use this endpoint to create a customer database

function createClientDatabase(connection, clientName){
	let client_name = clientName.toUpperCase();
	connection.query(`CREATE DATABASE ${client_name}`,
		function (error, results, fields) {
			if (error) {
				if (error.code === "ER_DB_CREATE_EXISTS") {
					console.log(`Failed to create ${client_name} database because it already exists.`);
				}else{
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log(`Successfully created ${client_name} database`);
			}
		}
	)
};

function insertClientDetailsIntoYaroDB(connection, clientName){
	let client_name = clientName.toUpperCase();
	try {
		connection.query(`INSERT INTO YaroDB.YARO_CLIENT
						  (client_id, client_db_name, client_name)
						  VALUES 
						  (uuid(), "${client_name}", "${client_name}")
						`),

		console.log(`Successfully added client details to YaroDB.YARO_CLIENT table`);
	} catch {
		console.log(`Error adding client details to YaroDB.YARO_CLIENT table`);

	}
};

function createClientClaimsTable(connection, clientName){
	let client_name = clientName.toUpperCase();

	connection.query(`CREATE TABLE ${client_name}.CLAIMS (
		claim_id VARCHAR(32) UNIQUE PRIMARY KEY,
		claim_type_id VARCHAR(32) NOT NULL,
		yaro_user_id VARCHAR(32) NOT NULL,
		client_id VARCHAR(32) NOT NULL,
		claim_amount DECIMAL(30, 2) NOT NULL,
		claim_added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`,function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log(`Failed to create ${client_name}.CLAIMS table because it already exists.`);
				} else if (error.code === "ER_BAD_DB_ERROR") {
					console.log(`Failed to create ${client_name}.CLAIMS table because database ${client_name} does not exist.`);
				} else {
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log(`Successfully created ${client_name}.CLAIMS table`);
			}
		}
	)
};

function createClientClaimTypeTable(connection, clientName) {
	let client_name = clientName.toUpperCase();
	connection.query(`CREATE TABLE ${client_name}.CLAIM_TYPE (
		claim_type_id VARCHAR(32) UNIQUE PRIMARY KEY,
		procedure_name VARCHAR(255) UNIQUE NOT NULL,
		description VARCHAR(512) NOT NULL
	)`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log(`Failed to create ${client_name}.CLAIM_TYPE table because it already exists.`);
				} else if (error.code === "ER_BAD_DB_ERROR") {
					console.log(`Failed to create ${client_name}.CLAIM_TYPE table because database ${client_name} does not exist.`);
				} else {
					console.log(`Unhandled error: ${error}`);
				}
			} else {
				console.log(`Successfully created ${client_name}.CLAIM_TYPE table`);
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




