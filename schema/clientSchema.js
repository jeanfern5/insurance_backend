//GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type CLAIMS {
        claimId: ID!,
        yaroUserId: ID!,
        clientId: ID!,
        claimAmount: Int!,
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