const mysql = require('mysql');


const DB_PASSWORD = process.env.DB_PASSWORD;
if (!DB_PASSWORD) {
	    throw Error("Please set DB_PASSWORD environment variable to connect");
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
						console.log("\n ERROR:", err);
						throw err;
					}

					let yaroUserId = results[0][`yaro_user_id`];
					resolve(yaroUserId); 
				}
			)	
		});

		promise.then((yaroUserId) => {
			pool.query(`SELECT * FROM YaroDB.YARO_CLIENT`,
				function (err, results){
					if (err) {
						console.log("ERROR:", err);
						throw err;
					}

					for (let i=0; i<results.length; i++) {
						let clientDB = results[i]['client_db_name'];

						pool.query(`SELECT * FROM ${clientDB}.CLAIMS WHERE yaro_user_id = ${yaroUserId} `,
							function (err, results){
								if (err) {
									console.log("ERROR:", err);
									throw err;
								}

								let result = results[0];

								console.log('---->1', result)

							
								
								clients.push(result);
								console.log('--->2', clients)
							}
						)
					}
					console.log('--->3', clients)
					return clients;
				}
			)
		})//end of promise
	},
	getClaim: async (args) => {
		const claimId = args.claimId;
		console.log("claimID", claimId);
		return new Promise ((resolve, reject) =>
		{pool.query(`SELECT client_db_name FROM YaroDB.YARO_CLIENT`, 
		function (err, results){
			if (err) {
				console.log("ERROR:", err);
				throw err;
			}

			for (let i=0; i<results.length; i++) {
				let clientDB = results[i]['client_db_name'];
				console.log('---->1', results[i]['client_db_name'])

				pool.query(`SELECT * FROM ${clientDB}.CLAIMS WHERE claim_id = ${claimId} `,
				function (err, results){
					if (err) {
						console.log("ERROR:", err);
						throw err;
					}

					if (!results[0]) {
						return;
					} else {
						let claimTypeId = results[0]['claim_type_id'];
						let claim = {};
						console.log('---->2', results)

						// pool.query(`SELECT * FROM ${clientDB}.CLAIM_TYPE WHERE claim_type_id = ${claimTypeId} `,
						// function (err, results){
						// 	if (err) {
						// 		console.log("ERROR:", err);
						// 		throw err;
						// 	}

						// 	// claim = ({ procedure: results[0]['procedure_name'], description: results[0]['description'] })
						// 	claim.procedure = results[0]['procedure_name'];
						// 	claim.description = results[0]['procedure_name'];
						// 	console.log('---->3', claim)
						// 	return claim;
						// })

						claim.claimId = results[0]['claim_id'];
						claim.yaroUserId = results[0]['yaro_user_id'];
						claim.clientId = results[0]['client_id'];
						//claim.claimTypeId = results[0]['claim_type_id'];
						claim.claimAmount = results[0]['claim_amount'];
						console.log('---->4', claim)
						resolve(claim) ;
						
					}
				})
			}
		})})

	},

}


//console.log(module.exports.getClaim({'claimId' : '1'}));