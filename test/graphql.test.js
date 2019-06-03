//Tests for mysql connection pool, listClaims, and getClaim  
const expect = require('chai').expect;
const should = require('chai').should();
const url = `http://localhost:8081`;
const request = require('supertest')(url);
const { pool } = require('../utils/utils');
const { checkDataTypes, checkClaimDetailsLength } = require('./testHelper');


describe('MySQL Pool Connection', () => {
    it("Should connect to AWS RDS without an error", (done) => {
        pool.getConnection((err, connection) => {
            if (err) return done(err);

            done();
        });
    });
});

describe('GraphQL', () => {
    it('Query listClaims: Should return all claims from username tinabelch', (done) => {
        request.post('/graphql')
        .expect(200)
        .send({ query: `
                    query {
                         listClaims (username: "tinabelch") { 
                            claimId
                            claimAddedDate
                            client
                            procedure
                            description
                            claimAmount
                        }
                    }` 
            })
        .end((err, res) => {
            if (err) return done(err);

            const claims = res.body.data.listClaims;

            expect(claims).to.have.lengthOf(3);

            for (let i=0; i<claims.length; i++) {
                checkClaimDetailsLength(claims[i], 6);
                checkDataTypes(claims[i]);

                should.exist(claims[i]['claimId']);
                should.exist(claims[i]['claimAddedDate']);
                should.exist(claims[i]['client']);
                should.exist(claims[i]['procedure']);
                should.exist(claims[i]['description']);
                should.exist(claims[i]['claimAmount']);
            };

            done();
        })  
    });

    it('Query getClaim: Should return details from claimId 8ee843eb-830b-11e9-85ce-02568a3c', (done) => {
        request.post('/graphql')
        .expect(200)
        .send({ query: `
                    query {
                         getClaim (claimId: "8ee843eb-830b-11e9-85ce-02568a3c") { 
                            claimId
                            claimAddedDate
                            client
                            procedure
                            description
                            claimAmount
                        }
                    }` 
            })
        .end((err, res) => {
            if (err) return done(err);

            const claim = res.body.data.getClaim;

            checkClaimDetailsLength(claim, 6);
            checkDataTypes(claim);

            expect(claim['claimId']).to.equal('8ee843eb-830b-11e9-85ce-02568a3c');
            should.exist(claim['claimAddedDate']);
            expect(claim['client']).to.equal('BLUES_CLUES');
            expect(claim['procedure']).to.equal('broken_leg');
            expect(claim['description']).to.equal('broken leg');
            expect(claim['claimAmount']).to.equal(7500);

            done();
        })  
    });
});


