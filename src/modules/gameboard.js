import Ship from "./ship";

export default class Gameboard {
  static {
    this.water = 0;
    this.waterHit = 1;
    this.shipHit = 2;
    this.shipSunk = 3;
  }

  constructor(size, nships) {
    this.size = size;
    this.board = [];
    for (let i = 0; i < size; i++) {
      this.board.push([]);
      for (let j = 0; j < size; j++) {
        this.board[i].push(Gameboard.water);
      }
    }
    this.nships = nships;
    this.nshipsSunk = 0;
  }

  checkValidPosition(x, y, dir, len) {
    if (dir === "ver") {
      if (x + len > this.size) return false;
      for (let i = x; i < x + len; i++) {
        if (this.board[i][y] instanceof Ship) return false;
      }
    } else if (dir === "hor") {
      if (y + len > this.size) return false;
      for (let i = y; i < y + len; i++) {
        if (this.board[x][i] instanceof Ship) return false;
      }
    }
    return true;
  }

  placeShip(x, y, dir, len) {
    const shipObj = new Ship(len);
    if (dir === "ver") {
      for (let i = x; i < x + len; i++) {
        this.board[i][y] = shipObj;
      }
    } else if (dir === "hor") {
      for (let i = y; i < y + len; i++) {
        this.board[x][i] = shipObj;
      }
    }
  }

  receiveAttack(x, y) {
    if (this.board[x][y] === Gameboard.water) {
      this.board[x][y] = Gameboard.waterHit;
    } else if (this.board[x][y] instanceof Ship) {
      const ship = this.board[x][y];
      ship.hit(x, y);
      if (ship.isSunk()) {
        this.nshipsSunk++;
        ship.hits.forEach((coor) => {
          this.board[coor.x][coor.y] = Gameboard.shipSunk;
        });
      } else {
        this.board[x][y] = Gameboard.shipHit;
      }
    }
  }

  allShipSunk() {
    return this.nships === this.nshipsSunk;
  }
}
