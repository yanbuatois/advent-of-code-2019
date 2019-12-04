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
  let nb = masse;
  while (nb > 0) {
    nb = Math.floor(nb / 3) - 2;
    if (nb > 0) {
      sum += nb;
    }
  }
}

console.log(`We need ${sum.toString().red} fuel.`);
console.timeEnd('main');
