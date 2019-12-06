export default class ProgramData {
  constructor(name, childrenIds = []) {
    this._name = name;
    this._childrenIds = childrenIds;
    this._parent = null;
  }

  get name() {
    return this._name;
  }

  get childrenIds() {
    return this._childrenIds;
  }

  set children(value) {
    this._children = value;
  }

  get children() {
    return this._children;
  }

  get parent() {
    return this._parent;
  }

  set parent(value) {
    this._parent = value;
  }

  addChildren(...children) {
    this._childrenIds.push(...children);
  }

  // get indirectChildren() {
  //   const {children} = this;
  //   const childrenOfChildren = children.flatMap(child => child.indirectChildren);
  //   return [...childrenOfChildren, ...children];
  // }

  get allParents() {
    const retour = [];
    let elt = this;
    while ((elt = elt.parent)) {
      retour.push(elt);
    }
    return retour;
  }

  get siblings() {
    if (this.parent) {
      return [...this.children, this.parent];
    } else {
      return [...this.children];
    }
  }
}
