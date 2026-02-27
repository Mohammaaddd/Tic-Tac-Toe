const xClass = "x";
const oClass = "o";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//dark mode
const toggleButton = document.querySelector(".theme-toggle");

//load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  if (toggleButton) toggleButton.textContent = "Light";
}

//toggle theme
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    toggleButton.textContent = "Light";
    localStorage.setItem("theme", "dark");
  } else {
    toggleButton.textContent = "Dark";
    localStorage.setItem("theme", "light");
  }
});

//get the cells
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]",
);
const restartButton = document.getElementById("restartButton");

let circleTurn;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  circleTurn = false;
  cells.forEach((cell) => {
    cell.classList.remove(xClass);
    cell.classList.remove(oClass);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? oClass : xClass;
  //place mark
  placeMark(cell, currentClass);

  //check for win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  //check for draw
  else if (isDraw()) {
    endGame(true);
  } else {
    //switch turns
    swapTurns();

    //applying hover effect
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerHTML = "Draw!";
  } else {
    winningMessageTextElement.innerHTML = `${circleTurn ? "O's" : "X's"} Wins`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cells].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(xClass);
  board.classList.remove(oClass);

  if (circleTurn) board.classList.add(oClass);
  else board.classList.add(xClass);
}

function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
