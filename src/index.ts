import { Context } from './context';
import { PiStorage } from './storage/PiStorage';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import sqlite3 from 'sqlite3';
import { makeExecutableSchema } from 'graphql-tools';
import { Registry } from './registry/registry';
import RegistryPackage from './registry/Package';
import { merge } from './merge';

// Initing storage
let db = new sqlite3.Database(__dirname + '/data.sqlite');
let storage = new PiStorage(db);
Context.setStorage(storage);

// Initing registry
const registry = new Registry();
registry.add(RegistryPackage);
for (let p of registry.packages) {
  console.log('Loaded ' + p.name + ' package');
}

// Schema and resolvers
let schema = makeExecutableSchema({
  typeDefs: registry.packages.map((v) => v.schema).join('\n'),
  resolvers: merge(...registry.packages.map((v) => v.resolver))
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
