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
  if (i === 245666) {
    console.log('test');
  } else if (i === 245555) {
    console.log('test');
  } else if (i === 246678) {
    console.log('test');
  }
  let followingDigits = false;
  let previous = -1;
  let nbFollowing = 1;
  for (const char of [...i.toString()]) {
    const num = Number(char);
    if (previous > num) {
      continue main;
    }
    if (previous === num) {
      ++nbFollowing;
    } else {
      if (!followingDigits && (nbFollowing === 2)) {
        followingDigits = true;
      }
      nbFollowing = 1;
    }
    previous = num;
  }
  if (!followingDigits && (nbFollowing === 2)) {
    followingDigits = true;
  }
  if (followingDigits) {
    ++nbPasswords;
  }
}

console.log(`There is ${nbPasswords.toString().grey} possible passwords.`);
console.timeEnd('main');
