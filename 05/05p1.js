import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import 'colors';
import _ from 'underscore';

console.time('main');
const intcodes = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input'), {
  encoding: 'utf-8',
}).trim().split(',').map(elt => elt.trim());


function getValue(address, mode) {
  address = Number(address);
  return mode ? address : Number(intcodes[address]);
}

function readLine() {
  return '1';
}

function writeChar(char) {
  console.log(char);
}


let position = 0;
loop: while (position < intcodes.length) {
  const modeNumsOr = [...(intcodes[position])];
  const code = Number(modeNumsOr.splice(-2,2).join(''));
  const mode = new Proxy([...modeNumsOr].reverse().map(elt => elt === '1'), {
    get: (target, p) => p in target ? target[p] : false,
  });
  let firstA, secondA, resultA, firstVal, secondVal;
  switch (code) {
    case 1:
      [firstA, secondA, resultA] = intcodes.slice(position + 1);
      firstVal = getValue(firstA, mode[0]);
      secondVal = getValue(secondA, mode[1]);
      intcodes[resultA] = (firstVal + secondVal).toString();
      position += 4;
      break;
    case 2:
      [firstA, secondA, resultA] = intcodes.slice(position + 1);
      firstVal = getValue(firstA, mode[0]);
      secondVal = getValue(secondA, mode[1]);
      intcodes[resultA] = (firstVal * secondVal).toString();
      position += 4;
      break;
    case 3:
      [resultA] = intcodes.slice(position + 1);
      firstVal = readLine();
      intcodes[resultA] = firstVal.toString();
      position += 2;
      break;
    case 4:
      [firstA] = intcodes.slice(position + 1);
      firstVal = getValue(firstA, mode[0]);
      writeChar(firstVal.toString());
      position += 2;
      break;
    case 99:
      break loop;
    default:
      ++position;
      break;
  }
}

// console.log(`The output is ${outputBuffer.toString().green}.`)
console.timeEnd('main');
