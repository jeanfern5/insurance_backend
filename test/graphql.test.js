const expect = require('chai').expect;
const should = require('chai').should();
const url = `http://localhost:8081`;
const request = require('supertest')(url);
const { pool } = require('../resolvers/select');


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


describe('GraphQL', () => {
    it("Should connect to AWS RDS without an error", (done) => {
        pool.getConnection((err, connection) => {
            if (err) return done(err);

            done();
        });
    });

    it('Should return all claims from username tinabelch', (done) => {
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
                expect(claimLength(claims[i])).to.equal(6);

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
    })

    it('Should return details from claimId 8ee843eb-830b-11e9-85ce-02568a3c', (done) => {
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

            expect(claimLength(claim)).to.equal(6);

            checkDataTypes(claim);

            expect(claim['claimId']).to.equal('8ee843eb-830b-11e9-85ce-02568a3c');
            should.exist(claim['claimAddedDate']);
            expect(claim['client']).to.equal('ATEALOT');
            expect(claim['procedure']).to.equal('broken_leg');
            expect(claim['description']).to.equal('broken leg');
            expect(claim['claimAmount']).to.equal(7500);

            done();
        })  
    })
});

