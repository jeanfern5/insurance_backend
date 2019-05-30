#!/usr/bin/env node
// Stand alone script for populating tables with dummy data.

function insertUserDetailsIntoYaroDB(connection){
	try {
		connection.query(`INSERT INTO YaroDB.YARO_USER
                          (yaro_user_id, email, username, first_name, last_name, city, state, zip, dob)
                          VALUES
                          ("0ae57bb0-8303-11e9-85ce-02568a3c3398", "tinabelcher@gmail.com", "tinabelch", "Tina", "Belcher", "Ocean City", "NJ", "21843", "2006-07-04"),
                          ("4cf0785b-8310-11e9-85ce-02568a3c3398", "ricksanchez@gmail.com", "rickyrick", "Rick", "Sanchez", "Seattle", "WA", "98101", "1949-05-23"),
                          ("19ae4a7a-8312-11e9-85ce-02568a3c3398", "bettycooper@gmail.com", "bee", "Betty", "Cooper", "Riverdale", "NY", "10005", "1992-12-12")
        `),
		console.log(`Successfully added user details to YaroDB.YARO_USER table`);
	} catch {
		console.log(`Error adding user details to YaroDB.YARO_USER table`);
	}
};

function insertActiveUserIntoYaroDB(connection){
	try {
        const atealotClientId = "a7a0adc6-831a-11e9-85ce-02568a3c";
        const bluesCluesClientId = "8836086e-831a-11e9-85ce-02568a3c";
        const ampmClientId = "7b5e0e48-831a-11e9-85ce-02568a3c";

		connection.query(`INSERT INTO YaroDB.YARO_ACTIVE_USER
                          (yaro_user_id, client_id, active)
                          VALUES
                          ("0ae57bb0-8303-11e9-85ce-02568a3c3398", "${atealotClientId}", "1"),
                          ("0ae57bb0-8303-11e9-85ce-02568a3c3398", "${bluesCluesClientId}", "0"),
                          ("4cf0785b-8310-11e9-85ce-02568a3c3398", "${bluesCluesClientId}", "1"),
                          ("19ae4a7a-8312-11e9-85ce-02568a3c3398", "${ampmClientId}", "1")
        `),
		console.log(`Successfully added user details to YaroDB.YARO_ACTIVE_USER table`);
	} catch {
		console.log(`Error adding user details to YaroDB.YARO_ACTIVE_USER table`);
	}
};

function insertClaimTypeIntoClientDB(connection){
	try {
        const ClientDB = "ATEALOT";
        
		connection.query(`INSERT INTO ${ClientDB}.CLAIM_TYPE
                          (claim_type_id, procedure_name, description)
                          VALUES
                          ("001ec361-830a-11e9-85ce-02568a3c", "broken_leg", "broken leg"),
                          ("8aef59e7-8313-11e9-85ce-02568a3c3398", "cold", "coughing, fever, shivers"),
                          ("976256f4-8313-11e9-85ce-02568a3c3398", "tymnoplasty", "ear surgery")
        `),
		console.log(`Successfully added claim details to ${ClientDB}.CLAIM_TYPE table`);
	} catch {
		console.log(`Error adding claim details to ${ClientDB}.CLAIM_TYPE table`);
	}
};

function insertClaimIntoClientDB(connection){
        const ClientDB = "ATEALOT";
        const atealotClientId = "a7a0adc6-831a-11e9-85ce-02568a3c";
  
	try {
		connection.query(`INSERT INTO ${ClientDB}.CLAIMS
                          (claim_id, claim_type_id, yaro_user_id, client_id, claim_amount)
                          VALUES
                          ("8ee843eb-830b-11e9-85ce-02568a3c", "001ec361-830a-11e9-85ce-02568a3c", "0ae57bb0-8303-11e9-85ce-02568a3c", "${atealotClientId}", "7500"),
                          ("f521c971-8313-11e9-85ce-02568a3c3398", "8aef59e7-8313-11e9-85ce-02568a3c3398", "0ae57bb0-8303-11e9-85ce-02568a3c", "${atealotClientId}", "300"),
                          ("fee0ecb1-8313-11e9-85ce-02568a3c3398", "8aef59e7-8313-11e9-85ce-02568a3c3398", "0ae57bb0-8303-11e9-85ce-02568a3c", "${atealotClientId}", "100")
        `),
		console.log(`Successfully added claim details to ${ClientDB}.CLAIMS table`);
	} catch {
		console.log(`Error adding claim details to ${ClientDB}.CLAIMS table`);
	}
};




module.exports = {
    //User Dummy Data
    insertUserDetailsIntoYaroDB,
    insertActiveUserIntoYaroDB,

    //Client Dummy Data
    insertClaimTypeIntoClientDB,
    insertClaimIntoClientDB
};
