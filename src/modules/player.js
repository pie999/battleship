import Gameboard from "./gameboard";

export default class Player {
  constructor(name, ownBoard, enemyBoard) {
    this.name = name;
    this.ownBoard = ownBoard;
    this.enemyBoard = enemyBoard;
  }

  checkValidPosition(x, y, dir, len) {
    return this.ownBoard.checkValidPosition(x, y, dir, len);
  }

  checkValidAttack(x, y) {
    if (
      this.enemyBoard.board[x][y] === Gameboard.waterHit ||
      this.enemyBoard.board[x][y] === Gameboard.shipHit ||
      this.enemyBoard.board[x][y] === Gameboard.shipSunk
    ) {
      return false;
    }
    return true;
  }

  placeShip(x, y, dir, len) {
    this.ownBoard.placeShip(x, y, dir, len);
  }

  attack(x, y) {
    this.enemyBoard.receiveAttack(x, y);
  }

  hasLost() {
    return this.ownBoard.allShipSunk();
  }
}
