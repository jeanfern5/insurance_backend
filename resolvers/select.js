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

const dateToString = date => new Date(date).toISOString();

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

		return new Promise ((resolve, reject) =>
		{pool.query(`SELECT client_db_name FROM YaroDB.YARO_CLIENT`, 
		function (err, results){
			if (err) {
				console.log("\nERROR:", err);
				throw err;
			}

			for (let i=0; i<results.length; i++) {
				let clientDB = results[i]['client_db_name'];

				pool.query(`SELECT * FROM ${clientDB}.CLAIMS WHERE claim_id = "${claimId}" `,
				function (err, results){
					if (err) {
						console.log("\nERROR:", err);
						throw err;
					}

					const data = results[0];

					if (!data) {
						return;
					} else {
						let claim = {};

						pool.query(`SELECT claim_added_date, procedure_name, description, claim_amount FROM  
								    (SELECT * FROM ${clientDB}.CLAIMS WHERE claim_id = "${claimId}") AS claim
									JOIN
									${clientDB}.CLAIM_TYPE AS claim_type 
									ON
									claim.claim_type_id = claim_type.claim_type_id`,
						function (err, results){
							if (err) {
								console.log("\nERROR:", err);
								throw err;
							}

							const data = results[0];
							claim.claimAddedDate = dateToString(data['claim_added_date']);
							claim.procedure = data['procedure_name'];
							claim.description = data['description'];
							claim.claimAmount = data['claim_amount'];

							resolve(claim);
						})
					}
				})
			}
		})})

	},

}


//console.log(module.exports.getClaim({'claimId' : '1'}));