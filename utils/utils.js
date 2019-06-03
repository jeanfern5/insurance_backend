const mysql = require('mysql');


const DB_PASSWORD = process.env.DB_PASSWORD;
if (!DB_PASSWORD) {
    throw Error("Please set DB_PASSWORD environment variable to connect")
}

function getConnection() {
    const connection = mysql.createConnection({
	  'connectionLimit' : 10,
	  'host' : 'yarodb.c01iybcdwlow.us-east-2.rds.amazonaws.com',
	  'user' : 'db_admin',
	  'password' : DB_PASSWORD
    });

    connection.connect();
    return connection;
};

const pool  = mysql.createPool({
	'connectionLimit' : 10,
	'host' : 'yarodb.c01iybcdwlow.us-east-2.rds.amazonaws.com',
	'user' : 'db_admin',
	'password' : DB_PASSWORD,
	'database': 'YaroDB'
});
if (!pool) {
    throw Error("Error connecting to mysql pool")
}


module.exports = { getConnection, pool }

