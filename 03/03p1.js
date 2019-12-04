import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import 'colors';
import _ from 'underscore';

console.time('main');

const [first, second] = fs.readFileSync(path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'input'), {
  encoding: 'utf-8',
}).trim().split('\n').map(elt => elt.trim().split(',').map(elt => {
  const [, direction, distance] = elt.trim().match(/([RDUL])(\d+)/);
  return {
    direction,
    distance: Number(distance),
  };
}));

const intersections = [];
const visitedCoords = new Proxy({}, {
  get: (target, p) => p in target ? target[p] : false,
});

function handleMoves(moves, firstTime = false) {
  const currentCoords = {
    x: 0,
    y: 0,
  };
  let coordToMove, factor;
  for (const {direction, distance} of moves) {
    switch (direction) {
      case 'U':
        [coordToMove, factor] = ['y', 1];
        break;
      case 'D':
        [coordToMove, factor] = ['y', -1];
        break;
      case 'L':
        [coordToMove, factor] = ['x', -1];
        break;
      case 'R':
        [coordToMove, factor] = ['x', 1];
        break;
      default:
        console.warn(`Unknown direction ${direction} (distance: ${distance}`);
        continue;
    }

    for (let i = 0; i < distance; ++i) {
      currentCoords[coordToMove] += factor;
      const strCoords = JSON.stringify(currentCoords);
      if (firstTime) {
        visitedCoords[strCoords] = true;
      } else if (visitedCoords[strCoords]) {
        intersections.push({...currentCoords});
      }
    }
  }
}

handleMoves(first, true);
handleMoves(second);

const manhattanDistance = ({x, y}) => Math.abs(x) + Math.abs(y);

const minDistance = manhattanDistance(_.min(intersections, manhattanDistance));

console.log(`The distance from the center to the closest intersection is ${minDistance.toString().green}.`);

const intersectionSteps = {};
for (const intersection of intersections) {
  intersectionSteps[JSON.stringify(intersection)] = [0, 0];
}
function countSteps(moves, num = 0) {
  const currentCoords = {
    x: 0,
    y: 0,
  };
  let steps = 0;
  let coordToMove, factor;
  for (const {direction, distance} of moves) {
    switch (direction) {
      case 'U':
        [coordToMove, factor] = ['y', 1];
        break;
      case 'D':
        [coordToMove, factor] = ['y', -1];
        break;
      case 'L':
        [coordToMove, factor] = ['x', -1];
        break;
      case 'R':
        [coordToMove, factor] = ['x', 1];
        break;
      default:
        console.warn(`Unknown direction ${direction} (distance: ${distance}`);
        continue;
    }

    for (let i = 0; i < distance; ++i) {
      ++steps;
      currentCoords[coordToMove] += factor;
      const strCoords = JSON.stringify(currentCoords);
      if (Object.prototype.hasOwnProperty.call(intersectionSteps, strCoords)) {
        intersectionSteps[strCoords][num] = steps;
      }
    }
  }
}

countSteps(first, 0);
countSteps(second, 1);

const cumulSteps = ([first, second]) => first + second;

const stepsEntries = Object.entries(intersectionSteps);
const minSteps = cumulSteps(_.min(stepsEntries, ([, second]) => cumulSteps(second))[1]);

console.log(`The intersection with the less steps have ${minSteps.toString().yellow}.`);
console.timeEnd('main');
