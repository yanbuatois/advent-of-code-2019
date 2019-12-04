import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import 'colors';
import _ from 'underscore';

console.time('main');
const intcodesOriginal = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input'), {
  encoding: 'utf-8',
}).trim().split(',').map(elt => Number(elt));

let verb, noun;

main: for (noun = 0; noun < 100; ++noun) {
  for (verb = 0; verb < 100; ++verb) {
    const intcodes = [...intcodesOriginal];

    intcodes[1] = noun;
    intcodes[2] = verb;
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

    if (intcodes[0] === 19690720) {
      break main;
    }
  }
}

console.log(`The noun is ${noun.toString().green}. The verb is ${verb.toString().yellow}. The result is ${((100 * noun) + verb).toString().red}.`);
console.timeEnd('main');
