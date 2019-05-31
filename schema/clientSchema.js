//GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type CLAIMS {
        claimId: ID!,
        claimAddedDate: String!,
        client: String!,
        procedure: String!,
        description: String!,
        claimAmount: Int!
    }
    type RootQuery {
        listClaims(username: String!): [CLAIMS!]!
        getClaim(claimId: ID!): CLAIMS!
    }
    schema {
        query: RootQuery
    }
`)