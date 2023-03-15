/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createGrid": () => (/* binding */ createGrid),
/* harmony export */   "renderEnemyGrid": () => (/* binding */ renderEnemyGrid),
/* harmony export */   "renderGrid": () => (/* binding */ renderGrid),
/* harmony export */   "returnClickedCellCoordinates": () => (/* binding */ returnClickedCellCoordinates),
/* harmony export */   "updateCellFunc": () => (/* binding */ updateCellFunc)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");

function createGrid(grid, size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell", "water");
      cell.dataset.x = i;
      cell.dataset.y = j;
      grid.appendChild(cell);
    }
  }
}
function updateCellFunc(grid, size, func) {
  for (let i = 1; i < size ** 2; i++) {
    const cell = grid.querySelector(`:nth-child(${i})`);
    cell.replaceWith(cell.cloneNode(true));
    cell.addEventListener("click", func);
  }
}
function returnClickedCellCoordinates(grid) {
  return new Promise(resolve => {
    const cells = grid.querySelectorAll(".cell");
    const clickHandler = e => {
      cells.forEach(cell => {
        cell.removeEventListener("click", clickHandler);
      });
      resolve([+e.target.dataset.x, +e.target.dataset.y]);
    };
    cells.forEach(cell => {
      cell.addEventListener("click", clickHandler);
    });
  });
}
function renderGrid(grid, board) {
  let n = 1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = grid.querySelector(`:nth-child(${n})`);
      if (board[i][j] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].waterHit) {
        cell.classList.add("waterHit");
      } else if (typeof board[i][j] === "object") {
        cell.classList.add("ship");
      } else if (board[i][j] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipHit) {
        cell.classList.add("shipHit");
      } else if (board[i][j] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipSunk) {
        cell.classList.add("shipSunk");
      }
      n++;
    }
  }
}
function renderEnemyGrid(grid, board) {
  let n = 1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = grid.querySelector(`:nth-child(${n})`);
      if (board[i][j] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].waterHit) {
        cell.classList.add("waterHit");
      } else if (board[i][j] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipHit) {
        cell.classList.add("shipHit");
      } else if (board[i][j] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipSunk) {
        cell.classList.add("shipSunk");
      }
      n++;
    }
  }
}

/***/ }),

/***/ "./src/modules/bot.js":
/*!****************************!*\
  !*** ./src/modules/bot.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Bot)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");

class Bot {
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
    } while (this.enemyBoard.board[x][y] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].waterHit || this.enemyBoard.board[x][y] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipHit || this.enemyBoard.board[x][y] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipSunk);
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

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

class Gameboard {
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
        if (this.board[i][y] instanceof _ship__WEBPACK_IMPORTED_MODULE_0__["default"]) return false;
      }
    } else if (dir === "hor") {
      if (y + len > this.size) return false;
      for (let i = y; i < y + len; i++) {
        if (this.board[x][i] instanceof _ship__WEBPACK_IMPORTED_MODULE_0__["default"]) return false;
      }
    }
    return true;
  }
  placeShip(x, y, dir, len) {
    const shipObj = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](len);
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
    } else if (this.board[x][y] instanceof _ship__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      const ship = this.board[x][y];
      ship.hit(x, y);
      if (ship.isSunk()) {
        this.nshipsSunk++;
        ship.hits.forEach(coor => {
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
(() => {
  Gameboard.water = 0;
  Gameboard.waterHit = 1;
  Gameboard.shipHit = 2;
  Gameboard.shipSunk = 3;
})();

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");

class Player {
  constructor(name, ownBoard, enemyBoard) {
    this.name = name;
    this.ownBoard = ownBoard;
    this.enemyBoard = enemyBoard;
  }
  checkValidPosition(x, y, dir, len) {
    return this.ownBoard.checkValidPosition(x, y, dir, len);
  }
  checkValidAttack(x, y) {
    if (this.enemyBoard.board[x][y] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].waterHit || this.enemyBoard.board[x][y] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipHit || this.enemyBoard.board[x][y] === _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipSunk) {
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

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  constructor(len) {
    this.len = len;
    this.hits = [];
  }
  hit(x, y) {
    this.hits.push({
      x,
      y
    });
  }
  isSunk() {
    return this.hits.length === this.len;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/modules/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _bot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bot */ "./src/modules/bot.js");
/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./UI */ "./src/modules/UI.js");
/* eslint-disable no-await-in-loop */
/* eslint-disable prefer-destructuring */




const grid1 = document.querySelector(".grid1");
const grid2 = document.querySelector(".grid2");
const size = 10;
const gameboard1 = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"](size, 10);
const gameboard2 = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"](size, 10);
const p1 = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]("pie", gameboard1, gameboard2);
const bot = new _bot__WEBPACK_IMPORTED_MODULE_2__["default"]("bot", gameboard2, gameboard1);
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
      [x, y] = await (0,_UI__WEBPACK_IMPORTED_MODULE_3__.returnClickedCellCoordinates)(grid1);
      dir = flipped ? "ver" : "hor";
      const valid = p1.checkValidPosition(x, y, dir, len);
      if (valid) {
        p1.placeShip(x, y, dir, len);
        (0,_UI__WEBPACK_IMPORTED_MODULE_3__.renderGrid)(grid, board);
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
      [x, y] = await (0,_UI__WEBPACK_IMPORTED_MODULE_3__.returnClickedCellCoordinates)(grid2);
    } while (!p1.checkValidAttack(x, y));
    p1.attack(x, y);
    (0,_UI__WEBPACK_IMPORTED_MODULE_3__.renderEnemyGrid)(grid2, gameboard2.board);
    bot.attack();
    (0,_UI__WEBPACK_IMPORTED_MODULE_3__.renderGrid)(gridn1, board1);
  }
  winMessage.textContent = p1.hasLost() ? "YOU LOSE" : "YOU WON";
}
async function gameSequence() {
  (0,_UI__WEBPACK_IMPORTED_MODULE_3__.createGrid)(grid1, size);
  (0,_UI__WEBPACK_IMPORTED_MODULE_3__.createGrid)(grid2, size);
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
})();

/******/ })()
;
//# sourceMappingURL=main.js.map