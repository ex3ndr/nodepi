// import { Registry } from './../registry/registry';
// import { PiStorage } from '../storage/PiStorage';
// import RegistryPackage from '../registry/Package';
// import sqlite3 from 'sqlite3';
import child_process from 'child_process';
import fs from 'fs';
import rimraf from 'rimraf';

// Init root directory
console.log('Validate and prepare data dir')
let root = (process.env.STORAGE_PATH || __dirname);
if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
}

// let db = new sqlite3.Database(root + '/data.sqlite');
// let storage = new PiStorage(db);

// // Initing registry
// const registry = new Registry();
// // registry.add(RegistryPackage);
// // for (let p of registry.packages) {
// //   console.log('Loaded ' + p.name + ' package');
// // }

// Reset modules folder
if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
}
if (fs.existsSync(root + '/modules/')) {
    rimraf.sync(root + '/modules/');
}
fs.mkdirSync(root + '/modules/');

// Write Packages
console.log('Writing package index');
fs.writeFileSync(root + '/modules/package.json', JSON.stringify({
    name: 'nodepi_modules',
    dependencies: {
        'nodepi': 'github:ex3ndr/nodepi'
    }
}));

// Install packages
console.log('Installing packages');
child_process.execSync('yarn', { cwd: root + '/modules/', stdio: 'inherit' });

// Run server
console.log('Starting server');
child_process.execSync('node "' + root + '/modules/node_modules/nodepi/build/server/index.js"', { cwd: root + '/modules/', stdio: 'inherit' });