//Use this endpoint to create a customer database
const  mysql = require('mysql');


const  DB_PASSWORD = process.env.DB_PASSWORD
if (!DB_PASSWORD) {
    throw Error("Please set DB_PASSWORD environment variable to connect")
}


const  pool  = mysql.createPool({
	  'connectionLimit' : 10,
	  'host' : 'yarodb.c01iybcdwlow.us-east-2.rds.amazonaws.com',
	  'user' : 'db_admin',
	  'password' : DB_PASSWORD
});


pool.query(`CREATE TABLE YaroDB.YARO_USER(
	  yaro_user_id VARCHAR(64)
	, first_name VARCHAR(64)
	, last_name VARCHAR(64)
	)
	` , function (error, results, fields) {
		  if (error) throw error;
	          console.log(results)
		  console.log(fields)
            }
);





/*
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	  if (error) throw error;
	  console.log('The solution is: ', results[0].solution);
});
*/



