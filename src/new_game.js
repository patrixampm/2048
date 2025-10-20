let board = [];
let score = 0;
const gridSize = 4;

const initGame = () => {
	board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(0));
	score = 0;
	updateScore();
	addRandomTile();
	addRandomTile();
	renderBoard();
}

const addRandomTile = () => {
	const emptyCells = [];
	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; j < gridSize; j++) {
			if (board[i][j] === 0) {
				emptyCells.push({row: i, col: j})
			}
		}
	}
	if(emptyCells.length > 0) {
		const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		board[randomCell.row][randomCell.col] = Math.random() < 0.8 ? 2 : 4;
	}
}

const renderBoard = () => {
	const gridContainer = document.querySelector('.grid-container');
	gridContainer.innerHTML = '';

	for (let i = 0; i < gridSize; i++) {
		for (let j = 0; i < gridSize; j++) {
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

const updateScore = () => {
	document.getElementById('score').textContent = score;
}

const move = (direction) => {
	let moved = false;
	const oldBoard = JSON.stringify(board);

	if (direction == 'left')
		moved = moveLeft();
	else if (direction == 'right')
		moved = moveRight();
	else if (direction == 'up')
		moved = moveUp();
	else if (direction == 'down')
		moved = moveDown();

	if (moved && JSON.stringify(board) !== oldBoard) {
		addRandomTile();
		renderBoard();
	
		if (checkWin())
			setTimeout(() => alert('You won! Good job for reaching 2048!'), 100);
		else if (checkGameOver())
			setTimeout(() => alert('Game Over! You have no space.'), 100);
	}
}
