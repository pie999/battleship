/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */
import Gameboard from "./gameboard";
import Player from "./player";
import Bot from "./bot";
import {
  createGrid,
  updateCellFunc,
  renderGrid,
  returnClickedCellCoordinates,
  renderEnemyGrid,
} from "./UI";

const grid1 = document.querySelector(".grid1");
const grid2 = document.querySelector(".grid2");
const size = 10;
const gameboard1 = new Gameboard(size, 10);
const gameboard2 = new Gameboard(size, 10);
const p1 = new Player("pie", gameboard1, gameboard2);
const bot = new Bot("bot", gameboard2, gameboard1);
const winMessage = document.querySelector(".win-message");

const flipBut = document.querySelector(".flip-but");
let flipped = false;
flipBut.addEventListener("click", () => {
  flipped = !flipped;
  flipBut.textContent = flipped ? "ver" : "hor";
});

async function placeShips(grid, board) {
  let x;
  let y;
  let dir;
  let len = 4;
  let times = 1;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < times; j++) {
      [x, y] = await returnClickedCellCoordinates(grid1);
      dir = flipped ? "ver" : "hor";
      const valid = p1.checkValidPosition(x, y, dir, len);
      if (valid) {
        p1.placeShip(x, y, dir, len);
        renderGrid(grid, board);
      } else {
        console.log("invalid position, try again");
        j--;
      }
    }
    len--;
    times++;
  }
  console.log("end");
}

async function battlePhase(gridn1, gridn2, board1, board2) {
  let x;
  let y;
  while (!p1.hasLost() && !bot.hasLost()) {
    do {
      [x, y] = await returnClickedCellCoordinates(grid2);
    } while (!p1.checkValidAttack(x, y));
    p1.attack(x, y);
    renderEnemyGrid(grid2, gameboard2.board);
    bot.attack();
    renderGrid(gridn1, board1);
  }
  winMessage.textContent = p1.hasLost() ? "YOU LOSE" : "YOU WON";
}

async function gameSequence() {
  createGrid(grid1, size);
  createGrid(grid2, size);
  await placeShips(grid1, gameboard1.board);
  bot.placeShips();
  await battlePhase(grid1, grid2, gameboard1.board, gameboard2.board);
}

gameSequence();

// createGrid(grid1, size);
// createGrid(grid2, size);
// placeShips(grid1, gameboard1.board);
// bot.placeShips();
// battlePhase(grid1, grid2, gameboard1.board, gameboard2.board);
