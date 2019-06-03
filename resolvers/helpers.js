//Helper functions to Select.js
const dateToString = (date) => new Date(date).toISOString();

const claimDetails = (data, clientName) => {
	return {
		claimId: data['claim_id'],
		claimAddedDate: dateToString(data['claim_added_date']),
		client: clientName,
		procedure: data['procedure_name'],
		description: data['description'],
		claimAmount: data['claim_amount']
	}
};


module.exports = {
    claimDetails
};