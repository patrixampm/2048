// Game state
let board = [];
let score = 0;
const gridSize = 4;

// Initialize the game
function initGame() {
  board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
  score = 0;
  updateScore();
  addRandomTile();
  addRandomTile();
  renderBoard();
}

// Add a random tile (2 or 4) to an empty cell
function addRandomTile() {
  const emptyCells = [];
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === 0) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }
  
  if (emptyCells.length > 0) {
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
  }
}

// Render the board
function renderBoard() {
  const gridContainer = document.querySelector('.grid-container');
  gridContainer.innerHTML = '';
  
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      if (board[i][j] !== 0) {
        tile.textContent = board[i][j];
        tile.classList.add(`tile-${board[i][j]}`);
      }
      gridContainer.appendChild(tile);
    }
  }
}

// Update score display
function updateScore() {
  document.getElementById('score').textContent = score;
}

// Move tiles in a direction
function move(direction) {
  let moved = false;
  const oldBoard = JSON.stringify(board);
  
  if (direction === 'left') {
    moved = moveLeft();
  } else if (direction === 'right') {
    moved = moveRight();
  } else if (direction === 'up') {
    moved = moveUp();
  } else if (direction === 'down') {
    moved = moveDown();
  }
  
  if (moved && JSON.stringify(board) !== oldBoard) {
    addRandomTile();
    renderBoard();
    
    if (checkWin()) {
      setTimeout(() => alert('You won! You reached 2048!'), 100);
    } else if (checkGameOver()) {
      setTimeout(() => alert('Game Over! No more moves available.'), 100);
    }
  }
}

// Move left
function moveLeft() {
  let moved = false;
  for (let i = 0; i < gridSize; i++) {
    let row = board[i].filter(val => val !== 0);
    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2;
        score += row[j];
        row.splice(j + 1, 1);
        moved = true;
      }
    }
    while (row.length < gridSize) row.push(0);
    if (JSON.stringify(board[i]) !== JSON.stringify(row)) moved = true;
    board[i] = row;
  }
  updateScore();
  return moved;
}

// Move right
function moveRight() {
  let moved = false;
  for (let i = 0; i < gridSize; i++) {
    let row = board[i].filter(val => val !== 0);
    for (let j = row.length - 1; j > 0; j--) {
      if (row[j] === row[j - 1]) {
        row[j] *= 2;
        score += row[j];
        row.splice(j - 1, 1);
        moved = true;
        j--;
      }
    }
    while (row.length < gridSize) row.unshift(0);
    if (JSON.stringify(board[i]) !== JSON.stringify(row)) moved = true;
    board[i] = row;
  }
  updateScore();
  return moved;
}

// Move up
function moveUp() {
  let moved = false;
  for (let j = 0; j < gridSize; j++) {
    let col = [];
    for (let i = 0; i < gridSize; i++) {
      if (board[i][j] !== 0) col.push(board[i][j]);
    }
    for (let i = 0; i < col.length - 1; i++) {
      if (col[i] === col[i + 1]) {
        col[i] *= 2;
        score += col[i];
        col.splice(i + 1, 1);
        moved = true;
      }
    }
    while (col.length < gridSize) col.push(0);
    for (let i = 0; i < gridSize; i++) {
      if (board[i][j] !== col[i]) moved = true;
      board[i][j] = col[i];
    }
  }
  updateScore();
  return moved;
}

// Move down
function moveDown() {
  let moved = false;
  for (let j = 0; j < gridSize; j++) {
    let col = [];
    for (let i = 0; i < gridSize; i++) {
      if (board[i][j] !== 0) col.push(board[i][j]);
    }
    for (let i = col.length - 1; i > 0; i--) {
      if (col[i] === col[i - 1]) {
        col[i] *= 2;
        score += col[i];
        col.splice(i - 1, 1);
        moved = true;
        i--;
      }
    }
    while (col.length < gridSize) col.unshift(0);
    for (let i = 0; i < gridSize; i++) {
      if (board[i][j] !== col[i]) moved = true;
      board[i][j] = col[i];
    }
  }
  updateScore();
  return moved;
}

// Check if player won
function checkWin() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === 2048) return true;
    }
  }
  return false;
}

// Check if game is over
function checkGameOver() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (board[i][j] === 0) return false;
      if (j < gridSize - 1 && board[i][j] === board[i][j + 1]) return false;
      if (i < gridSize - 1 && board[i][j] === board[i + 1][j]) return false;
    }
  }
  return true;
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    move('left');
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    move('right');
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    move('up');
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    move('down');
  }
});

// Restart button
document.getElementById('restart-btn').addEventListener('click', initGame);

// Start the game
initGame();
