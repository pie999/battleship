import Gameboard from "./gameboard";

export function createGrid(grid, size) {
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

export function updateCellFunc(grid, size, func) {
  for (let i = 1; i < size ** 2; i++) {
    const cell = grid.querySelector(`:nth-child(${i})`);
    cell.replaceWith(cell.cloneNode(true));
    cell.addEventListener("click", func);
  }
}

export function returnClickedCellCoordinates(grid) {
  return new Promise((resolve) => {
    const cells = grid.querySelectorAll(".cell");

    const clickHandler = (e) => {
      cells.forEach((cell) => {
        cell.removeEventListener("click", clickHandler);
      });
      resolve([+e.target.dataset.x, +e.target.dataset.y]);
    };

    cells.forEach((cell) => {
      cell.addEventListener("click", clickHandler);
    });
  });
}

export function renderGrid(grid, board) {
  let n = 1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = grid.querySelector(`:nth-child(${n})`);
      if (board[i][j] === Gameboard.waterHit) {
        cell.classList.add("waterHit");
      } else if (typeof board[i][j] === "object") {
        cell.classList.add("ship");
      } else if (board[i][j] === Gameboard.shipHit) {
        cell.classList.add("shipHit");
      } else if (board[i][j] === Gameboard.shipSunk) {
        cell.classList.add("shipSunk");
      }
      n++;
    }
  }
}

export function renderEnemyGrid(grid, board) {
  let n = 1;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      const cell = grid.querySelector(`:nth-child(${n})`);
      if (board[i][j] === Gameboard.waterHit) {
        cell.classList.add("waterHit");
      } else if (board[i][j] === Gameboard.shipHit) {
        cell.classList.add("shipHit");
      } else if (board[i][j] === Gameboard.shipSunk) {
        cell.classList.add("shipSunk");
      }
      n++;
    }
  }
}
