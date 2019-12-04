import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import 'colors';
import _ from 'underscore';

console.time('main');

const [first, second] = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input'), {
  encoding: 'utf-8',
}).trim().split('-').map(elt => Number(elt.trim()));

let nbPasswords = 0;
main: for (let i = first; i <= second; ++i) {
  let followingDigits = false;
  let previous = -1;
  for (const char of [...i.toString()]) {
    const num = Number(char);
    if (previous > num) {
      continue main;
    }
    if (previous === num) {
      followingDigits = true;
    }
    previous = num;
  }
  if (followingDigits) {
    ++nbPasswords;
  }
}

console.log(`There is ${nbPasswords.toString().grey} possible passwords.`);
console.timeEnd('main');
