import _ from 'underscore';
import Asteroid from './Asteroid.js';

export default class AsteroidStorage {
  constructor () {
    this._elements = {};
  }

  getByName(name) {
    return this._elements[name];
  }

  addElement(...elements) {
    for (const element of elements) {
      this._elements[element.name] = element;
    }
  }

  *iterate() {
    for (const key in this._elements) {
      yield this._elements[key];
    }
  }

  *iterateFromRoot() {
    yield * this._suffix();
  }

  *_suffix(element = this.getRoot()) {
    yield element;
    for (const child of element.children) {
      yield * this._suffix(child);
    }
  }

  getRoot() {
    const possibleRoots = [];
    const seenNames = [];
    for (const element of this.iterate()) {
      seenNames.push(...element.childrenIds);
      possibleRoots.push(element.name);
    }
    return this.getByName(_.difference(possibleRoots, seenNames)[0]);
  }

  buildChildren() {
    for (const element of this.iterate()) {
      element.children = element.childrenIds.map(elt => {
        let child;
        if (!(child = this.getByName(elt))) {
          child = this.createIfNotExists(elt);
          child.children = [];
        }
        child.parent = element;
        return child;
      });
    }
  }

  createIfNotExists(name, ...children) {
    if (!Object.prototype.hasOwnProperty.call(this._elements, name)) {
      this._elements[name] = new Asteroid(name);
    }
    this._elements[name].addChildren(...children);
    return this._elements[name];
  }

  dijkstraLength(debut, fin) {
    if (!(debut instanceof Asteroid)) {
      debut = this.getByName(debut);
    }
    if (!(fin instanceof Asteroid)) {
      fin = this.getByName(fin);
    }

    const dist = {};
    const prev = {};
    const P = [];
    const Q = {...this._elements};

    const graphIterator = this.iterate();
    for (const v of graphIterator) {
      dist[v.name] = Number.POSITIVE_INFINITY;
      prev[v.name] = null;
    }
    dist[debut.name] = 0;

    while (Object.keys(Q).length) {
      const u = this.getByName(_.min(Object.keys(Q), (key) => dist[key]));

      delete Q[u.name];

      for (const v of u.siblings) {
        const alt = dist[u.name] + 1;
        if (alt < dist[v.name]) {
          dist[v.name] = alt;
          prev[v.name] = u;
        }
      }
    }

    return dist[fin.name];
  }
}
