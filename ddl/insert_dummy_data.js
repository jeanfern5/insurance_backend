#!/usr/bin/env node
// Stand alone script for populating tables with dummy data.

function insertUserDetailsIntoYaroDB(connection){
	try {
		connection.query(`INSERT INTO YaroDB.YARO_USER
                          (yaro_user_id, email, username, first_name, last_name, city, state, zip, dob)
                          VALUES
                          ("0ae57bb0-8303-11e9-85ce-02568a3c", "tinabelcher@gmail.com", "tinabelch", "Tina", "Belcher", "Ocean City", "NJ", "21843", "2006-07-04"),
                          ("4cf0785b-8310-11e9-85ce-02568a3c", "ricksanchez@gmail.com", "rickyrick", "Rick", "Sanchez", "Seattle", "WA", "98101", "1949-05-23"),
                          ("19ae4a7a-8312-11e9-85ce-02568a3c", "bettycooper@gmail.com", "bee", "Betty", "Cooper", "Riverdale", "NY", "10005", "1992-12-12")
        `),
		console.log(`Successfully added user details to YaroDB.YARO_USER table`);
	} catch {
		console.log(`Error adding user details to YaroDB.YARO_USER table`);
	}
};

function insertActiveUserIntoYaroDB(connection){
	try {
        const atealotClientId = "420c9d2b-8324-11e9-85ce-02568a3c";
        const bluesCluesClientId = "494fae23-8324-11e9-85ce-02568a3c";
        const ampmClientId = "45384a6b-8324-11e9-85ce-02568a3c";

		connection.query(`INSERT INTO YaroDB.YARO_ACTIVE_USER
                          (yaro_user_id, client_id, active)
                          VALUES
                          ("0ae57bb0-8303-11e9-85ce-02568a3c", "${atealotClientId}", "1"),
                          ("0ae57bb0-8303-11e9-85ce-02568a3c", "${bluesCluesClientId}", "0"),
                          ("4cf0785b-8310-11e9-85ce-02568a3c", "${bluesCluesClientId}", "1"),
                          ("19ae4a7a-8312-11e9-85ce-02568a3c", "${ampmClientId}", "1")
        `),
		console.log(`Successfully added user details to YaroDB.YARO_ACTIVE_USER table`);
	} catch {
		console.log(`Error adding user details to YaroDB.YARO_ACTIVE_USER table`);
	}
};

function insertClaimTypeIntoClientA(connection){
	try {
        const ClientDB = "ATEALOT";
        
		connection.query(`INSERT INTO ${ClientDB}.CLAIM_TYPE
                          (claim_type_id, procedure_name, description)
                          VALUES
                          ("001ec361-830a-11e9-85ce-02568a3c", "broken_leg", "broken leg"),
                          ("8aef59e7-8313-11e9-85ce-02568a3c", "cold", "coughing, fever, shivers"),
                          ("976256f4-8313-11e9-85ce-02568a3c", "tymnoplasty", "ear surgery")
        `),
		console.log(`Successfully added claim details to ${ClientDB}.CLAIM_TYPE table`);
	} catch {
		console.log(`Error adding claim details to ${ClientDB}.CLAIM_TYPE table`);
	}
};

function insertClaimIntoClientA(connection){
        const ClientDB = "ATEALOT";
        const atealotClientId = "420c9d2b-8324-11e9-85ce-02568a3c";
  
	try {
		connection.query(`INSERT INTO ${ClientDB}.CLAIMS
                          (claim_id, claim_type_id, yaro_user_id, client_id, claim_amount)
                          VALUES
                          ("8ee843eb-830b-11e9-85ce-02568a3c", "001ec361-830a-11e9-85ce-02568a3c", "0ae57bb0-8303-11e9-85ce-02568a3c", "${atealotClientId}", "7500"),
                          ("fee0ecb1-8313-11e9-85ce-02568a3c", "8aef59e7-8313-11e9-85ce-02568a3c", "0ae57bb0-8303-11e9-85ce-02568a3c", "${atealotClientId}", "100")
        `),
		console.log(`Successfully added claim details to ${ClientDB}.CLAIMS table`);
	} catch {
		console.log(`Error adding claim details to ${ClientDB}.CLAIMS table`);
	}
};

function insertClaimTypeIntoClientB(connection){
	try {
        const ClientDB = "BLUES_CLUES";
        
		connection.query(`INSERT INTO ${ClientDB}.CLAIM_TYPE
                          (claim_type_id, procedure_name, description)
                          VALUES
                          ("13e6a277-8321-11e9-85ce-02568a3c", "broken_arm", "Arm is broken"),
                          ("3d77ddff-8321-11e9-85ce-02568a3c", "cold", "common cold")
        `),
		console.log(`Successfully added claim details to ${ClientDB}.CLAIM_TYPE table`);
	} catch {
		console.log(`Error adding claim details to ${ClientDB}.CLAIM_TYPE table`);
	}
};

function insertClaimIntoClientB(connection){
    const ClientDB = "BLUES_CLUES";
    const bluesCluesClientId = "494fae23-8324-11e9-85ce-02568a3c";
  
	try {
		connection.query(`INSERT INTO ${ClientDB}.CLAIMS
                          (claim_id, claim_type_id, yaro_user_id, client_id, claim_amount)
                          VALUES
                          ("f521c971-8313-11e9-85ce-02568a3c", "3d77ddff-8321-11e9-85ce-02568a3c", "0ae57bb0-8303-11e9-85ce-02568a3c", "${bluesCluesClientId}", "300"),
                          ("1d824f7e-8323-11e9-85ce-02568a3c", "3d77ddff-8321-11e9-85ce-02568a3c", "4cf0785b-8310-11e9-85ce-02568a3c", "${bluesCluesClientId}", "500")
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
    insertClaimTypeIntoClientA,
    insertClaimIntoClientA,
    insertClaimTypeIntoClientB,
    insertClaimIntoClientB,
};
