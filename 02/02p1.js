import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import 'colors';
import _ from 'underscore';

console.time('main');
const intcodes = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input'), {
  encoding: 'utf-8',
}).trim().split(',').map(elt => Number(elt));

intcodes[1] = 12;
intcodes[2] = 2;
let position = 0;
loop: while (position < intcodes.length) {
  const code = intcodes[position];
  let firstA, secondA, resultA, firstVal, secondVal;
  switch (code) {
    case 1:
      [firstA, secondA, resultA] = intcodes.slice(position + 1);
      firstVal = intcodes[firstA];
      secondVal = intcodes[secondA];
      intcodes[resultA] = firstVal + secondVal;
      position += 4;
      break;
    case 2:
      [firstA, secondA, resultA] = intcodes.slice(position + 1);
      firstVal = intcodes[firstA];
      secondVal = intcodes[secondA];
      intcodes[resultA] = firstVal * secondVal;
      position += 4;
      break;
    case 99:
      break loop;
    default:
      ++position;
      break;
  }
}

console.log(`The 0 value is ${intcodes[0].toString().green}.`)
console.timeEnd('main');
