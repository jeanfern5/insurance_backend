// This is a stand alone script 

const mysql = require('mysql');


const  DB_PASSWORD = process.env.DB_PASSWORD
if (DB_PASSWORD === undefined) {
    throw Error("Please set DB_PASSWORD environment variable to connect")
}

const  connection = mysql.createConnection({
	  'connectionLimit' : 10,
	  'host' : 'yarodb.c01iybcdwlow.us-east-2.rds.amazonaws.com',
	  'user' : 'db_admin',
	  'password' : DB_PASSWORD
});


connection.connect();



function dropYaroTable(connection) {
	connection.query("DROP TABLE YaroDB.YARO_USER"
		, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_BAD_TABLE_ERROR") {
					console.log("Failed to drop table YaroDB because it does not exist.")
				}
			} else {
				console.log(results)
				console.log(fields)
			} 
		}
	);
} ;

function createYaroTable(connection) {
	connection.query(`CREATE TABLE YaroDB.YARO_USER(
		yaro_user_id VARCHAR(64)
		, first_name VARCHAR(64)
		, last_name VARCHAR(64)
	)
		`, function (error, results, fields) {
			if (error) {
				if (error.code === "ER_TABLE_EXISTS_ERROR") {
					console.log("Failed to create table YaroDB because it already exists.")
				} 
			} else {
				console.log(results)
				console.log(fields)
			}
		}
	);
};



connection.end();





