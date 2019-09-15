import express from 'express';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { Registry } from './registry/registry';
import RegistryPackage from './registry/Package';
import { merge } from './merge';
import { makeExecutableSchema } from 'graphql-tools';

// Initing registry
const registry = new Registry();
registry.add(RegistryPackage);
for (let p of registry.packages) {
  console.log('Loaded ' + p.name + ' package');
}

// Schema and resolvers
let schema = makeExecutableSchema({
  typeDefs: registry.packages.map((v) => v.schema).join('\n'),
  resolvers:  merge(...registry.packages.map((v) => v.resolver))
});

// Run server
var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.get('/', (req, res) => res.send('Hello World!'));

// Start
app.listen(3000, () => console.log('Running nodepi on port 3000'));
