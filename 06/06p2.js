import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import 'colors';
import _ from 'underscore';

import AsteroidsStorage from './AsteroidsStorage.js';
import Asteroid from './Asteroid.js';

console.time('main');
const ast = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input'), {
  encoding: 'utf-8',
}).trim().split('\n').map(elt => elt.trim().match(/^(?<parent>[^)]+)\)(?<child>[^)]+)$/u).groups);

const storage = new AsteroidsStorage();

for (const {parent, child} of ast) {
  storage.createIfNotExists(parent, child);
}

storage.buildChildren();

console.log(`Distance is ${storage.dijkstraLength(storage.getByName('YOU').parent, storage.getByName('SAN').parent)} objects away.`);
console.timeEnd('main');
