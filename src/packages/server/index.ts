import { Context } from '../api/context';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { Registry } from '../registry/registry';
import RegistryPackage from '../registry/Package';
import { merge } from './merge';
import fs from 'fs';
// import { readRegistry } from '../registry/storage';

// Initing storage
const root = (process.env.STORAGE_PATH || __dirname);
if (!fs.existsSync(root)) {
  fs.mkdirSync(root);
}

// const registryData = readRegistry(root + '/registry.json');
Context.setDataPath(root);

// Initing registry
const registry = new Registry();
registry.add(RegistryPackage);
// for(let p of registryData) {
//   registry.add(p.name)
// }
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
app.get('/', (req, res) => res.send('Welcome to NodePi!'));

// Start
app.listen(3000, () => console.log('Running nodepi on port 3000'));
