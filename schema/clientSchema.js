//GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type CLAIMS {
        claim_id: ID!,
        yaro_user_id: ID!,
        client_id: ID!,
        claim_type_id: ID!,
        claim_amount: Int!
    }
    type CLAIM_TYPE {
        client_type_id: ID!,
        procedure: String!,
        description: String!,
    }
    input CLAIMS_INPUT{
        claim_amount: Int!  
    }
    input CLAIM_TYPES_INPUT {
        procedure: String!,
        description: String!,
    }
    type RootQuery {
        listClaims(username: String!): [CLAIMS!]!
        getClaims(claimId: ID!): CLAIMS!
    }
    schema {
        query: RootQuery
    }
`)