//Test Helper Functions
const expect = require('chai').expect;


const checkDataTypes = (claim) => {
    expect(claim['claimId']).to.be.a('string');
    expect(claim['claimAddedDate']).to.be.a('string');
    expect(claim['client']).to.be.a('string');
    expect(claim['procedure']).to.be.a('string');
    expect(claim['description']).to.be.a('string');
    expect(claim['claimAmount']).to.be.a('number');
};

const claimLength = (claim) => {
    return (Object.keys(claim).length);
};

const checkClaimDetailsLength = (claim, expectedLength) => {
    return (expect(claimLength(claim)).to.equal(expectedLength));
};


module.exports = {
    checkDataTypes,
    checkClaimDetailsLength,
    
};