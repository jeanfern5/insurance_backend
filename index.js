const express = require('express');
const graphqlHTTP = require('express-graphql');

const Schema = require('./schema/clientSchema');
const Resolvers = require('./resolvers/select');

const app = express();
app.use(express.json());

var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  hello: () => {
    return 'Hello world!';
  },
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));


app.listen(8081, () => {
    console.log('\n========== Express GraphQL Server Now Running On localhost:8081/graphql ==========\n');  
})

