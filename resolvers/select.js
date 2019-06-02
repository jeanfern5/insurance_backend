const mysql = require('mysql');
const deferred = require('q').defer();

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

const dateToString = (date) => new Date(date).toISOString();

module.exports = {
	listClaims: async (input, res) => {
		let username = input[`username`];
		
		const getUserId = async (username) => { 
			await pool.query(`SELECT yaro_user_id FROM YaroDB.YARO_USER WHERE username = '${username}'`,
			function (err, results) {
				if (err) {
					console.log("\n ---->ERROR retrieving yaro_user_id:", err);
					throw err;
				}

				let yaroUserId = results[0][`yaro_user_id`];
				getAllClaims(yaroUserId);
			})
		}


		getUserId(username);
		const getAllClaims = (userId) =>  {
		return new Promise ((resolve, reject) => {
		pool.query(`SELECT * FROM YaroDB.YARO_CLIENT`,
		function (err, results){
			let claims = [];
			if (err) {
				console.log("\n---->ERROR retrieving clients databases:", err);
				throw err;
			}

			for (let i=0; i<results.length; i++) {
				let clientDB = results[i]['client_db_name'];
				

				pool.query(`SELECT claim_id, claim_added_date, procedure_name, description, claim_amount FROM  
							(SELECT * FROM ${clientDB}.CLAIMS WHERE yaro_user_id = "${userId}") AS claims
							JOIN
							${clientDB}.CLAIM_TYPE AS claim_type 
							ON
							claims.claim_type_id = claim_type.claim_type_id`,
				function (err, results){
					if (err) {
						console.log("\n---->ERROR retrieving claims data:", err);
						throw err;
					}

					// console.log('----->results', results)
					// deferred.resolve(results)

					results.map(data => {
						let claim = {}
						claim.claimId = data['claim_id'];
						claim.claimAddedDate = dateToString(data['claim_added_date']);
						claim.client = clientDB;
						claim.procedure = data['procedure_name'];
						claim.description = data['description'];
						claim.claimAmount = data['claim_amount'];
						claims.push(claim);
					})
				})
			}
			deferred.resolve(claims);
		})
	})
		}
		return deferred.promise;

		// })
	},
	getClaim: async (args) => {
		const claimId = args.claimId;

		return new Promise ((resolve, reject) => {
		pool.query(`SELECT client_db_name FROM YaroDB.YARO_CLIENT`, 
		function (err, results){
			if (err) {
				throw err;
			}

			for (let i=0; i<results.length; i++) {
				let clientDB = results[i]['client_db_name'];
				let claim = {};

				pool.query(`SELECT * FROM ${clientDB}.CLAIMS WHERE claim_id = "${claimId}" `,
				function (err, results){
					if (err) {
						throw err;
					}

					const data = results[0];

					if (!data) {
						return;
					} else {
						pool.query(`SELECT claim_id, claim_added_date, procedure_name, description, claim_amount FROM  
								    (SELECT * FROM ${clientDB}.CLAIMS WHERE claim_id = "${claimId}") AS claim
									JOIN
									${clientDB}.CLAIM_TYPE AS claim_type 
									ON
									claim.claim_type_id = claim_type.claim_type_id`,
						function (err, results){
							if (err) {
								throw err;
							}

							const data = results[0];

							claim.claimId = data['claim_id'];
							claim.claimAddedDate = dateToString(data['claim_added_date']);
							claim.client = clientDB;
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
	pool,
}




// console.log(module.exports.listClaims({'username' : 'tinabelch'}));
