#!/usr/bin/env node
// Stand alone script for populating tables with dummy data.

// function insertUserDetailsIntoYaroDB(connection){
// 	try {
// 		connection.query(`INSERT INTO YaroDB.YARO_USER
//                           (email, username, first_name, last_name, city, state, zip, dob)
//                           VALUES
//                           ("testuser@gmail.com", "testuser", "Test", "User", "Chicago", "IL", "60616", "1999-05-23")
//         `),
// 		console.log(`Successfully added user details to YaroDB.YARO_USER table`);
// 	} catch {
// 		console.log(`Error addeding user details to YaroDB.YARO_USER table`);
// 	}
// };

// function insertActiveUserIntoYaroDB(connection){
// 	try {
// 		connection.query(`INSERT INTO YaroDB.YARO_ACTIVE_USER
//                           (yaro_user_id, client_id, active)
//                           VALUES
//                           ("", "", "")
//         `),
// 		console.log(`Successfully added user details to YaroDB.YARO_ACTIVE_USER table`);
// 	} catch {
// 		console.log(`Error addeding user details to YaroDB.YARO_ACTIVE_USER table`);
// 	}
// };


// module.exports = {
//     insertUserDetailsIntoYaroDB,

// };
