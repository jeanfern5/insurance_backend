const mysql = require('mysql');
const clientDB = require('../ddl/client_db');

const DB_PASSWORD = process.env.DB_PASSWORD
if (!DB_PASSWORD) {
	    throw Error("Please set DB_PASSWORD environment variable to connect")
}

const pool  = mysql.createPool({
		  'connectionLimit' : 10,
		  'host' : 'yarodb.c01iybcdwlow.us-east-2.rds.amazonaws.com',
		  'user' : 'db_admin',
			'password' : DB_PASSWORD,
			'database': 'yarodb'
});

module.exports = {
	listClaims: async (username) => {
		return new Promise((resolve, reject) => {
			response = []
			pool.query(`select client_db_name FROM YaroDB.YARO_CLIENT`,
				function (err, results){
					if(err) console.log("TODO: HANDLE THIS ERROR", err);
					for (db_name in results['some_key_that_references_db']){
						pool.query(`select * from ${db_name}.CLAIMS`,
							function(err, result){
								if(err) console.log("TODO ...");
								response.append(result['some_key_for_row']);
							}
						)
					}
				}
			)
			resolve(response);
		})
	},
	getClaim: async (args) => {
		
	},

}

// exports.listClaims = ({ id }) => {
// 	return new Promise((resolve, reject) => {
// 		response = []
// 	  pool.query(`select client_db_name FROM YaroDB.YARO_CLIENT`,
// 	  function (err, results){
// 		  if(err) console.log("TODO: HANDLE THIS ERROR");
// 		  for db_name in results['some_key_that_references_db']{
// 			  pool.query(`select * from ${db_name}.CLAIMS`,
// 			  function(err, result){
// 				  if(err): console.log("TODO ...");
// 				  response.append(result['some_key_for_row']);
// 			  }
// 			 )
// 		  }
  
// 	  }
// 	  resolve(response);
	  
//   )
  
// 	  });
// 	});
//   };
  
  
//   const viewerType = new GraphQLObjectType({
// 	name: 'Viewer',
// 	fields: () => ({
// 	  user: {
// 		type: userType,
// 		args: {
// 		  userid: {
// 			type: GraphQLInt,
// 		  },
// 		  claimid: {
// 			  type: GraphQLInt,
// 		  }
// 		},
// 		resolve: (rootValue, args) => {
// 		  return listClaims({ id : args.userid }).then(value => value);
// 		},
// 	  },
// 	}),
//   });
  
  