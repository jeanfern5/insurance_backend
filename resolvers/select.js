const deferred = require('q').defer();

const { pool } = require('../utils/utils');
const { claimDetails } = require('./helpers');


module.exports = {
	listClaims: (input) => {
		let username = input[`username`];
		
		const getUserId = (username) => { 
			pool.query(`SELECT yaro_user_id FROM YaroDB.YARO_USER WHERE username = '${username}'`,
			function (err, results) {
				if (err) throw err;
			
				let yaroUserId = results[0][`yaro_user_id`];
				getAllClaims(yaroUserId);
			})
		};


		getUserId(username);

		const getAllClaims = (userId) =>  {
			pool.query(`SELECT client_db_name, client_name FROM YaroDB.YARO_CLIENT`,
			function (err, results){
				if (err) throw err;

				let claims = [];

				for (let i=0; i<results.length; i++) {
					let clientDB = results[i]['client_db_name'];
					let clientName = results[i]['client_name'];

					pool.query(`SELECT claim_id, claim_added_date, procedure_name, description, claim_amount 
								FROM  
								(SELECT * FROM ${clientDB}.CLAIMS WHERE yaro_user_id = "${userId}") AS claims
								JOIN
								${clientDB}.CLAIM_TYPE AS claim_type 
								ON
								claims.claim_type_id = claim_type.claim_type_id`,
					function (err, results){
						if (err) throw err;

						results.map(data => {
							claims.push(claimDetails(data, clientName));
						})
					})
				}
				deferred.resolve(claims);
			})
		};
		return deferred.promise;
	},
	getClaim: (args) => {
		const claimId = args.claimId;

		return new Promise ((resolve, reject) => {
		pool.query(`SELECT client_db_name, client_name FROM YaroDB.YARO_CLIENT`, 
		function (err, results) {
			if (err) throw err;

			for (let i=0; i<results.length; i++) {
				let clientDB = results[i]['client_db_name'];
				let clientName = results[i]['client_name'];

				pool.query(`SELECT * FROM ${clientDB}.CLAIMS WHERE claim_id = "${claimId}" `,
				function (err, results){
					if (err) throw err;

					const data = results[0];

					if (!data) {
						return;
					} else {
						pool.query(`SELECT claim_id, claim_added_date, procedure_name, description, claim_amount 
									FROM  
								    (SELECT * FROM ${clientDB}.CLAIMS WHERE claim_id = "${claimId}") AS claim
									JOIN
									${clientDB}.CLAIM_TYPE AS claim_type 
									ON
									claim.claim_type_id = claim_type.claim_type_id`,
						function (err, results){
							if (err) throw err;

							const data = results[0];

							resolve(claimDetails(data, clientName));
						})
					}
				})
			}
		})})
	},

};

