const mysql = require('mysql');


const DB_PASSWORD = process.env.DB_PASSWORD
if (!DB_PASSWORD) {
	    throw Error("Please set DB_PASSWORD environment variable to connect")
}

const pool  = mysql.createPool({
		  'connectionLimit' : 10,
		  'host' : 'yarodb.c01iybcdwlow.us-east-2.rds.amazonaws.com',
		  'user' : 'db_admin',
			'password' : DB_PASSWORD,
			'database': 'YaroDB'
});

module.exports = {
	listClaims: async (input) => {
		let username = input[`username`];
		let clients = [];

		let promise = new Promise ((resolve, reject) => {
			pool.query(`SELECT yaro_user_id FROM YaroDB.YARO_USER WHERE username = '${username}'`,
				function (err, results) {
					if (err) {
						console.log("ERROR:", err);
						throw err;
					}

					let yaro_user_id = results[0][`yaro_user_id`];
					console.log('---->yaro_user_id1', yaro_user_id);
					resolve(yaro_user_id); 
				}
			)	
		});

		promise.then((yaro_user_id) => {
			console.log('--->yaro_user_id2', yaro_user_id)
			// SELECT client_id FROM YaroDB.YARO_ACTIVE_USER WHERE yaro_user_id = '${yaro_user_id}' AND active = 1
			pool.query(`SELECT * FROM YaroDB.YARO_ACTIVE_USER WHERE yaro_user_id = '${yaro_user_id}' AND active = 1`,
				function (err, results){
					if (err) {
						console.log("ERROR:", err);
						throw err;
					}
					let selectUnion = '';

					for (let i=0; i<results.length; i++) {
						let clientId = results[i]['client_id'];

						pool.query(`SELECT client_db_name FROM YaroDB.YARO_CLIENT WHERE client_id = ${clientId}`,
							function (err, results){
								if (err) {
									console.log("ERROR:", err);
									throw err;
								}

								let clientDB = results[0]['client_db_name'];
								console.log('---->3', results )

								selectUnion += `SELECT * FROM ${clientDB}.CLAIMS WHERE yaro_user_id = '${yaro_user_id}'`;
								if (i != (results.length - 1)) {
									selectUnion += ' UNION ';
								}

								console.log('------>4', selectUnion);

								// pool.query(`${select_str}`,
								// 	function (err, results){
								// 		if (err) {
								// 			console.log("ERROR:", err);
								// 			throw err;
								// 		}

								// 		console.log('------->5', results)
								// 	}
								// )
							}
						)





					//-------
					// pool.query(select_str,function()){

					// }

					// 	clientDB = results[i][`client_db_name`];
					// 	console.log('---->clientDB3', clientDB)

					// 	pool.query(`SELECT * FROM ${clientDB}.CLAIMS WHERE yaro_user_id = '${yaro_user_id}' `,
					// 		function(err, result){
					// 			if (err) {
					// 				console.log("ERROR:", err);
					// 				throw err;
					// 			}

					// 			clients.append(result[clientDB]);
					// 		}
					// 	)
					//---------
					}
				}
			)
		})
		

		// return new Promise((resolve, reject) => {
		// 	let response = [];

			// pool.query(`SELECT client_db_name FROM YaroDB.YARO_CLIENT`,
			// 	function (err, results){
					// if (err) {
					// 	console.log("ERROR:", err);
					// 	throw err;
					// }

					// for (let i=0; i<results.length; i++) {
					// 	let clientDB = results[i][`client_db_name`];
					// 	console.log('---->', clientDB)

					// 	pool.query(`SELECT * FROM ${clientDB}.CLAIMS`,
					// 		function(err, result){
					// 			if (err) {
					// 				console.log("ERROR:", err);
					// 				throw err;
					// 			}

					// 			response.append(result[clientDB]);
					// 		}
					// 	)
					// }

			// 		// for (clientDB in results[`client_db_name`]){
			// 		// 	pool.query(`SELECT * FROM ${clientDB}.CLAIMS`,
			// 		// 		function(err, result){
			// 		// 			if (err) {
			// 		// 				console.log("ERROR:", err);
			// 		// 				throw err;
			// 		// 			}

			// 		// 			response.append(result[clientDB]);
			// 		// 		}
			// 		// 	)
			// 		// }
			// 	}
			// )
		// 	resolve(response);
		// })
	},
	getClaim: async (claimId) => {
		
	},

}
