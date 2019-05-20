const mysql = require('mysql');

	const DB_PASSWORD = process.env.DB_PASSWORD
if (!DB_PASSWORD) {
	    throw Error("Please set DB_PASSWORD environment variable to connect")
}


const pool  = mysql.createPool({
		  'connectionLimit' : 10,
		  'host' : 'yarodb.c01iybcdwlow.us-east-2.rds.amazonaws.com',
		  'user' : 'db_admin',
		  'password' : DB_PASSWORD
});


//TODO
// //add_row is called by the resolver
// function (args) add_row {
// pool.query(`INSERT INTO ${customer_name}.CLIMS (args)`
// ,
// 		function (error, results, fields) {
// 			if (error) throw error;
// 			console.log(results)
// 			console.log(fields)
// 		}
// 	);
// }