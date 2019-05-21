//GraphQL Schema
const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Client.CLAIMS {
        claim_id: ID!,
        yaro_user_id: ID!,
        client_id: ID!,
        claim_type_id: ID!,
        claim_amount: INT!
    }
    type Client.CLAIM_TYPE {
        client_type_id: ID!,
        procedure: String!,
        description: String!,
    }
    input Client.CLAIMS_INPUT{
        claim_amount: INT!  
    }
    type Client.CLAIM_TYPES_INPUT {
        procedure: String!,
        description: String!,
    }
    type RootQuery {
        listClaims: [Client.CLAIMS!]!
        getClaims(claim_id: ID!): Client.CLAIMS!
    }
    type RootMutation {
        createClaim(clientClaimsInput: Client.CLAIMS_INPUT!): YARO_USER
        createClaimType(clientClaimsTypeInput: Client.CLAIM_TYPES_INPUT!): YARO_CLIENT
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)