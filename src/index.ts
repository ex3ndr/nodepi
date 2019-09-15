import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

// Schema
var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Resolvers
var root = {
  hello: () => {
    return 'Hello world!';
  },
};

// Run server
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.get('/', (req, res) => res.send('Hello World!'));

// Start
app.listen(3000, () => console.log('Running nodepi on port 3000'));
