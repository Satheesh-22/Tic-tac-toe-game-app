const board = document.getElementById('board');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const endScreen = document.getElementById('endScreen');
const resultText = document.getElementById('resultText');
const newGameBtn = document.getElementById('newGameBtn');
const startScreen = document.getElementById('startScreen');
const gameContainer = document.getElementById('gameContainer');

let userSymbol = 'X';
let computerSymbol = 'O';
let currentPlayer = 'X';
let gameActive = false;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Start game after symbol is chosen
function startGame(symbol) {
  userSymbol = symbol;
  computerSymbol = symbol === 'X' ? 'O' : 'X';
  currentPlayer = 'X';
  gameActive = true;
  startScreen.style.display = 'none';
  gameContainer.style.display = 'flex';
  status.innerText = userSymbol === 'X' ? "Your turn" : "Computer's turn";
  resetBoard();

  // If computer starts
  if (userSymbol === 'O') {
    setTimeout(computerMove, 500);
  }
}

function resetBoard() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  createBoard();
}

function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.classList.add('cell');
    cellDiv.setAttribute('data-index', index);
    cellDiv.innerText = cell;
    cellDiv.addEventListener('click', handleUserClick);
    board.appendChild(cellDiv);
  });
}

function handleUserClick(e) {
  const index = e.target.getAttribute('data-index');

  if (!gameActive || gameState[index] !== "" || currentPlayer !== userSymbol) return;

  makeMove(index, userSymbol);

  if (checkWinner(userSymbol)) {
    endGame("You win!");
    return;
  }

  if (isDraw()) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = computerSymbol;
  status.innerText = "Computer's turn";

  setTimeout(computerMove, 500);
}

function computerMove() {
  const emptyIndices = gameState
    .map((val, idx) => val === "" ? idx : null)
    .filter(val => val !== null);

  if (emptyIndices.length === 0 || !gameActive) return;

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  makeMove(randomIndex, computerSymbol);

  if (checkWinner(computerSymbol)) {
    endGame("Computer wins!");
    return;
  }

  if (isDraw()) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = userSymbol;
  status.innerText = "Your turn";
}

function makeMove(index, player) {
  gameState[index] = player;
  document.querySelector(`[data-index='${index}']`).innerText = player;
}

function checkWinner(player) {
  return winConditions.some(([a, b, c]) =>
    gameState[a] === player && gameState[b] === player && gameState[c] === player
  );
}

function isDraw() {
  return gameState.every(cell => cell !== "");
}

function endGame(message) {
  gameActive = false;
  resultText.innerText = message;
  endScreen.style.display = 'flex';
}

function restartGame() {
  endScreen.style.display = 'none';
  startScreen.style.display = 'flex';
  gameContainer.style.display = 'none';
}

restartBtn.addEventListener('click', restartGame);
newGameBtn.addEventListener('click', restartGame);
