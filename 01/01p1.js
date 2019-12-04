import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import 'colors';
import _ from 'underscore';

console.time('main');
const masses = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input'), {
  encoding: 'utf-8',
}).trim().split('\n').map(elt => Number(elt.trim()));

let sum = 0;
for (const masse of masses) {
  sum += Math.floor(masse / 3) - 2;
}

console.log(`We need ${sum.toString().red} fuel.`);
console.timeEnd('main');
