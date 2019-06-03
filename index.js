const express = require('express');
const graphqlHTTP = require('express-graphql');

const Schema = require('./schema/clientSchema');
const Resolvers = require('./resolvers/select');

const app = express();
app.use(express.json());

app.use('/graphql', graphqlHTTP({
    schema: Schema,
    rootValue: Resolvers,
    graphiql: true,
}));

app.listen(8081, () => {
    console.log('\n========== Express GraphQL Server Now Running On localhost:8081/graphql ==========\n');  
});

