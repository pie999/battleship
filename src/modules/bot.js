import Gameboard from "./gameboard";

export default class Bot {
  constructor(name, ownBoard, enemyBoard) {
    this.name = name;
    this.ownBoard = ownBoard;
    this.enemyBoard = enemyBoard;
  }

  checkValidPosition(x, y, dir, len) {
    return this.ownBoard.checkValidPosition(x, y, dir, len);
  }

  placeShip(x, y, dir, len) {
    this.ownBoard.placeShip(x, y, dir, len);
  }

  attack() {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (
      this.enemyBoard.board[x][y] === Gameboard.waterHit ||
      this.enemyBoard.board[x][y] === Gameboard.shipHit ||
      this.enemyBoard.board[x][y] === Gameboard.shipSunk
    );

    this.enemyBoard.receiveAttack(x, y);
  }

  hasLost() {
    return this.ownBoard.allShipSunk();
  }

  placeShips() {
    let len = 4;
    let times = 1;
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < times; j++) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const dir = Math.random() > 0.5 ? "ver" : "hor";
        const valid = this.checkValidPosition(x, y, dir, len);
        if (valid) {
          this.placeShip(x, y, dir, len);
        } else {
          j--;
        }
      }
      len--;
      times++;
    }
  }
}
