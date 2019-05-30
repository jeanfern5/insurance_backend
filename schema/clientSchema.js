//GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type CLAIMS {
        claimAddedDate: String!,
        procedure: String!,
        description: String!,
        claimAmount: Int!
    }
    type CLAIM_TYPE {
        client_type_id: ID!,
        procedure: String!,
        description: String!,
    }
    type RootQuery {
        listClaims(username: String!): [CLAIMS!]!
        getClaim(claimId: ID!): CLAIMS!
    }
    schema {
        query: RootQuery
    }
`)