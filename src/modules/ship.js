export default class Ship {
  constructor(len) {
    this.len = len;
    this.hits = [];
  }

  hit(x, y) {
    this.hits.push({ x, y });
  }

  isSunk() {
    return this.hits.length === this.len;
  }
}
